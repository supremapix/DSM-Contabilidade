import React from 'react';
import { Link } from 'react-router-dom';
import EnhancedSEO from './EnhancedSEO';
import data from '../data/accountingHistory.json';

const path = '/' + data.slug;
export default function AccountingEditorial({ index = false }: { index?: boolean }) {
  const title = index ? 'Blog da DSM Contabilidade' : data.title;
  const url = data.base + (index ? '/blog' : path);
  const description = index ? 'Artigos e guias de contabilidade da DSM Contabilidade, no Bacacheri, Curitiba.' : data.description;
  const schema = index ? undefined : {
    '@context': 'https://schema.org', '@type': 'BlogPosting',
    headline: title, description, datePublished: data.date, mainEntityOfPage: url,
    image: [data.base + data.image], author: { '@type': 'Organization', name: 'DSM Contabilidade', url: data.base },
    publisher: { '@type': 'Organization', name: 'DSM Contabilidade', url: data.base }, inLanguage: 'pt-BR'
  };
  return <section className="mx-auto max-w-4xl px-5 py-8 sm:px-8 sm:py-14">
    <EnhancedSEO title={title + ' | DSM Contabilidade'} description={description} canonicalUrl={url} type={index ? 'website' : 'article'}
      schema={schema} editorialImage={index ? undefined : { url: data.base + data.image, alt: data.alt, width: data.width, height: data.height }} />
    <nav aria-label="Você está aqui" className="mb-5 flex flex-wrap gap-3 text-sm font-semibold text-blue-800">
      <Link className="underline" to="/">Início</Link>{!index && <><span aria-hidden="true">/</span><Link className="underline" to="/blog">Blog</Link></>}
    </nav>
    <h1 className="mb-4 text-3xl font-black leading-tight text-[#0d1e3d] sm:text-5xl">{title}</h1>
    {index ? <article className="rounded-2xl border border-slate-200 bg-white p-6">
      <h2 className="text-2xl font-bold text-[#0d1e3d]"><Link className="underline underline-offset-4" to={path}>{data.title}</Link></h2>
      <p className="mt-3 leading-relaxed">{data.deck}</p>
    </article> : <article>
      <p className="mb-4 leading-relaxed">{data.deck}</p>
      <p className="mb-5 text-sm text-slate-700">DSM Contabilidade · <time dateTime={data.date}>{data.humanDate}</time></p>
      <figure className="mb-7">
        <img src={data.image} alt={data.alt} width={data.width} height={data.height} fetchPriority="high" decoding="async" className="block h-auto w-full rounded-2xl" />
        <figcaption className="mt-2 text-sm text-slate-700">{data.caption}</figcaption>
      </figure>
      <div className="space-y-4 leading-relaxed [&_p]:leading-relaxed [&_h2]:mt-8 [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-[#0d1e3d] [&_a]:font-semibold [&_a]:text-blue-800 [&_a]:underline [&_a]:underline-offset-2"
        dangerouslySetInnerHTML={{ __html: data.body }} />
      <p className="mt-7"><Link className="font-semibold text-blue-800 underline" to="/blog">Voltar ao blog</Link></p>
    </article>}
  </section>;
}
