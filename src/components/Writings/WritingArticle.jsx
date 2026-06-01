import React from "react";
import { Link, Navigate } from "react-router-dom";
import { getWritingBySlug } from "./writingsData.js";
import OverEngineeredArchitecture from "./articles/OverEngineeredArchitecture.jsx";
import "./article.css";

const ARTICLE_COMPONENTS = {
  "over-engineered-architecture": OverEngineeredArchitecture,
};

export default function WritingArticle({ slug }) {
  const meta = getWritingBySlug(slug);
  const ArticleBody = ARTICLE_COMPONENTS[slug];

  if (!meta || !ArticleBody) {
    return <Navigate to="/writings" replace />;
  }

  return (
    <article className="article">
      <Link to="/writings" className="articleBack">
        ← All writings
      </Link>

      <header className="articleHeader">
        <div className="articleMeta">
          <time dateTime={meta.dateTime}>{meta.date}</time>
          {meta.tags?.length > 0 && (
            <ul className="articleTags" aria-label="Tags">
              {meta.tags.map((tag) => (
                <li key={tag}>{tag}</li>
              ))}
            </ul>
          )}
        </div>
        <h1 className="articleTitle">{meta.title}</h1>
        {meta.subtitle && <p className="articleSubtitle">{meta.subtitle}</p>}
      </header>

      <div className="articleBody">
        <ArticleBody />
      </div>
    </article>
  );
}
