import React from "react";
import { Link } from "react-router-dom";
import { writings } from "./writingsData.js";
import "./writings.css";

export default function Writings() {
  return (
    <section id="writings" className="writings">
      <h1 className="writingsTitle">Writings</h1>
      <p className="writingsDesc">
        Essays, notes, and longer-form pieces on architecture, systems, and building software
        that earns its complexity.
      </p>

      <div className="writingsList">
        {writings.map((item) => (
          <article className="writingCard" key={item.slug}>
            <div className="writingMeta">
              <time dateTime={item.dateTime}>{item.date}</time>
              {item.tags?.length > 0 && (
                <ul className="writingTags" aria-label="Tags">
                  {item.tags.map((tag) => (
                    <li key={tag}>{tag}</li>
                  ))}
                </ul>
              )}
            </div>
            <h2 className="writingTitle">
              <Link to={`/writings/${item.slug}`} className="writingTitleLink">
                {item.title}
              </Link>
            </h2>
            <p className="writingSummary">{item.summary}</p>
            <Link to={`/writings/${item.slug}`} className="writingLink">
              Read article
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}
