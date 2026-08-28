/* ==========================================================================
   GTech Digital — Blog / Article JSON-LD builder
   ==========================================================================

   Produces the same @graph as blog/article-schema.template.html, but from a
   post object instead of string tokens. Use this wherever the post data is
   available at render time.

   Static page:
     <script src="/assets/js/article-schema.js"></script>
     <script>GTechSchema.inject({ slug: "...", title: "...", ... });</script>

   Next.js (App Router) — the same function, no DOM needed:
     import { buildArticleSchema } from '@/lib/article-schema';
     <script type="application/ld+json"
       dangerouslySetInnerHTML={{ __html: JSON.stringify(buildArticleSchema(post)) }} />

   Why a @graph rather than a bare BlogPosting: the article, its author, its
   breadcrumb and the publisher are cross-referenced by @id, so Google resolves
   them as one connected entity instead of four unrelated fragments. The
   Organization @id matches the one already used site-wide.
   ========================================================================== */

(function (root) {
  'use strict';

  var SITE = 'https://www.gtechdigital.co.uk';

  var ORG_ID = SITE + '/#organization';
  var SITE_ID = SITE + '/#website';

  /* Trailing slashes and leading slashes in slugs are a common CMS artefact
     and would produce doubled separators in every @id. Normalise once. */
  function slugOf(post) {
    return String(post.slug || '').replace(/^\/+|\/+$/g, '');
  }

  function postUrl(post) {
    return SITE + '/blog/' + slugOf(post);
  }

  /* Google drops the rich result when headline exceeds 110 characters, so
     prefer an explicit short headline and fall back to a trim of the title. */
  function headlineOf(post) {
    var h = post.headline || post.title || '';
    return h.length > 110 ? h.slice(0, 107).replace(/\s+\S*$/, '') + '…' : h;
  }

  function organization() {
    return {
      '@type': 'Organization',
      '@id': ORG_ID,
      name: 'GTech Digital',
      url: SITE + '/',
      logo: {
        '@type': 'ImageObject',
        '@id': SITE + '/#logo',
        url: SITE + '/assets/frontend/images/logo.png',
        caption: 'GTech Digital'
      },
      image: { '@id': SITE + '/#logo' },
      telephone: '+44 203 598 5956',
      email: 'info@gtechdigital.co.uk',
      address: {
        '@type': 'PostalAddress',
        addressCountry: 'GB',
        addressLocality: 'London'
      }
    };
  }

  function person(post) {
    var a = post.author || {};
    var node = {
      '@type': 'Person',
      '@id': SITE + '/author/' + (a.slug || 'gtech-digital') + '#person',
      name: a.name || 'GTech Digital',
      url: SITE + '/author/' + (a.slug || 'gtech-digital'),
      worksFor: { '@id': ORG_ID }
    };
    if (a.jobTitle) node.jobTitle = a.jobTitle;
    if (a.bio) node.description = a.bio;
    if (a.image) node.image = { '@type': 'ImageObject', url: a.image };
    /* Emit sameAs only when a profile actually exists — an array containing
       an empty string is worse than omitting the property. */
    var links = (a.sameAs || []).filter(Boolean);
    if (links.length) node.sameAs = links;
    return node;
  }

  function breadcrumb(post) {
    var items = [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE + '/' },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: SITE + '/blog' }
    ];
    if (post.category && post.categorySlug) {
      items.push({
        '@type': 'ListItem',
        position: 3,
        name: post.category,
        item: SITE + '/blog/category/' + post.categorySlug
      });
    }
    /* The final crumb is the current page: name only, no item URL. */
    items.push({ '@type': 'ListItem', position: items.length + 1, name: post.title });

    return {
      '@type': 'BreadcrumbList',
      '@id': postUrl(post) + '#breadcrumb',
      itemListElement: items
    };
  }

  function image(post) {
    if (!post.image || !post.image.url) return null;
    var i = post.image;
    var node = {
      '@type': 'ImageObject',
      '@id': postUrl(post) + '#primaryimage',
      url: i.url,
      contentUrl: i.url
    };
    if (i.width) node.width = i.width;
    if (i.height) node.height = i.height;
    if (i.alt) node.caption = i.alt;
    return node;
  }

  function buildArticleSchema(post) {
    if (!post || !post.slug || !post.title) {
      throw new Error('article-schema: post requires at least slug and title');
    }

    var url = postUrl(post);
    var img = image(post);
    /* dateModified must reflect a real edit. Falling back to datePublished is
       correct; wiring it to the build timestamp is a known spam signal. */
    var modified = post.dateModified || post.datePublished;

    var article = {
      '@type': 'BlogPosting',
      '@id': url + '#article',
      isPartOf: { '@id': url + '#webpage' },
      mainEntityOfPage: { '@id': url + '#webpage' },
      headline: headlineOf(post),
      description: post.description || '',
      datePublished: post.datePublished,
      dateModified: modified,
      author: { '@id': person(post)['@id'] },
      publisher: { '@id': ORG_ID },
      inLanguage: post.lang || 'en-GB'
    };
    if (img) article.image = { '@id': img['@id'] };
    if (post.category) article.articleSection = post.category;
    if (post.keywords && post.keywords.length) article.keywords = post.keywords;
    if (post.wordCount) article.wordCount = post.wordCount;
    if (post.readingTime) article.timeRequired = post.readingTime;

    var webpage = {
      '@type': 'WebPage',
      '@id': url + '#webpage',
      url: url,
      name: post.title + ' | GTech Digital',
      description: post.description || '',
      isPartOf: { '@id': SITE_ID },
      breadcrumb: { '@id': url + '#breadcrumb' },
      datePublished: post.datePublished,
      dateModified: modified,
      inLanguage: post.lang || 'en-GB'
    };
    if (img) webpage.primaryImageOfPage = { '@id': img['@id'] };

    var graph = [article, webpage];
    if (img) graph.push(img);
    graph.push(breadcrumb(post), person(post), organization(), {
      '@type': 'WebSite',
      '@id': SITE_ID,
      url: SITE + '/',
      name: 'GTech Digital',
      publisher: { '@id': ORG_ID },
      inLanguage: 'en-GB'
    });

    /* An article that answers questions should say so — this is what wins the
       FAQ accordion in the SERP. Only emit when the post actually has them. */
    if (post.faqs && post.faqs.length) {
      graph.push({
        '@type': 'FAQPage',
        '@id': url + '#faq',
        mainEntity: post.faqs.map(function (f) {
          return {
            '@type': 'Question',
            name: f.q,
            acceptedAnswer: { '@type': 'Answer', text: f.a }
          };
        })
      });
    }

    return { '@context': 'https://schema.org', '@graph': graph };
  }

  /* Injects the schema into <head>. Replaces a previously injected block so
     client-side route changes cannot leave two articles' schema on the page. */
  function inject(post) {
    var schema = buildArticleSchema(post);
    var existing = document.getElementById('gtech-article-schema');
    if (existing) existing.parentNode.removeChild(existing);
    var el = document.createElement('script');
    el.type = 'application/ld+json';
    el.id = 'gtech-article-schema';
    el.textContent = JSON.stringify(schema);
    document.head.appendChild(el);
    return schema;
  }

  var api = { buildArticleSchema: buildArticleSchema, inject: inject };

  if (typeof module === 'object' && module.exports) module.exports = api;
  root.GTechSchema = api;
})(typeof globalThis !== 'undefined' ? globalThis : this);
