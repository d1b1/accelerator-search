import React from 'react';
import algoliasearch from 'algoliasearch/lite';
import headerImage from './assets/logo.png';
import fallbackImage from './assets/no-logo.png';
import GitHubButton from 'react-github-btn';

import {
  Configure,
  Highlight,
  Hits,
  InstantSearch,
  Pagination,
  SearchBox,
  RefinementList,
  Stats
} from 'react-instantsearch';

import { Panel } from './Panel';

import type { Hit } from 'instantsearch.js';

import './App.css';

const searchClient = algoliasearch(
  'UD1VE6KV0J',
  'd0b91f75be19811b3ba4dfb05e0c6deb'
);

function toTitleCase(str) {
  return str.replace(
    /\w\S*/g,
    function (txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    }
  );
}

const transformItems = (items) => {
  return items.map((item) => ({
    ...item,
    label: item.label.replace(/_/g, ' '),
  }));
};

const future = { preserveSharedStateOnUnmount: true };

export function App() {
  return (
    <div>

      <InstantSearch
          searchClient={searchClient}
          indexName="Funds"
          future={future}
          routing={true}
      >

      <header className="header">
        <h1 className="header-title">
          Investment Funds & Programs
          <Stats/>
        </h1>
        <div className="gh-btn">
          <GitHubButton href="https://github.com/d1b1/accelerator-search" data-color-scheme="no-preference: light; light: light; dark: dark;" data-size="large" data-show-count="true" aria-label="Star d1b1/accelerator-search on GitHub">Star</GitHubButton>
        </div>
      </header>

      <div className="container-fluid">
        
          <Configure hitsPerPage={25} />

          <div className="row">
            <div className="col-3 d-none d-md-block d-lg-block">

              <div className="filter-el">
                <h4>
                  Structure:
                </h4>
                <RefinementList attribute="structure" />
              </div>

              <div className="filter-el">
                <h4>
                  Investment Focuses:
                </h4>
                <RefinementList attribute="industries" />
              </div>

              <div className="filter-el">
                <h4>
                  Country:
                </h4>
                <RefinementList attribute="country" />
              </div>

            </div>
            <div className="col-md-9 p-4">
              <SearchBox placeholder="Enter a name..." className="searchbox" />

              <Hits hitComponent={Hit} />

              <div className="pagination">
                <Pagination />
              </div>
            </div>

          </div>
      </div>
      </InstantSearch>
    </div>
  );
}

type HitProps = {
  hit: Hit;
};

function ImageWithFallback({ src, alt, ...props }) {
  const handleError = (e) => {
    e.target.src = fallbackImage;
  };

  return <img src={src || ''} alt={alt} onError={handleError} {...props} />;
}

function Hit({ hit }: HitProps) {
  return (
    <article>
      <div className="row">
        <div className="col-4">
          <h1>
            <Highlight attribute="name" hit={hit} />
          </h1>
          <p>
            <Highlight attribute="description" hit={hit} />
          </p>
        </div>
        <div className="col-4">
          <p>
            <b>Location:</b> <Highlight attribute="country" hit={hit} /><br/>
            <b>Structure:</b> {hit['structure']}<br/>
            <b>Website:</b> <a href={hit['website']} target="_blank">{hit.website}</a>
          </p>
        </div>
        <div className="col-4 text-end">
          <p>
            {(hit.industries || []).map((item, index) => (
              <span key={index} className="badge bg-secondary me-1">
                {item}
              </span>
            ))}
          </p>
        </div>
      </div>
    </article>
  );
}
