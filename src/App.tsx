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
  RefinementList
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
      <header className="header">
        <h1 className="header-title">
          {/* <img src={headerImage} className="logo" /> */}
        </h1>
        <p className="header-subtitle">
          Find Accelerators by 'Program', 'location', 'industry' or 'stage'.
        </p>
        <div className="gh-btn">
          <GitHubButton href="https://github.com/d1b1/techstar-search" data-color-scheme="no-preference: light; light: light; dark: dark;" data-size="large" data-show-count="true" aria-label="Star d1b1/techstar-search on GitHub">Star</GitHubButton>
        </div>
      </header>

      <div className="container">
        <InstantSearch
          searchClient={searchClient}
          indexName="Accelerators"
          future={future}
        >
          <Configure hitsPerPage={10} />
          <div className="search-panel">
            <div className="filters" >

              <div className="filter-el">
                <h4>
                  Investment Stage:
                </h4>
                <RefinementList attribute="stages" />
              </div>

              <div className="filter-el">
                <h4>
                  Industry:
                </h4>
                <RefinementList searchable="true" attribute="industries" searchablePlaceholder="Enter industry/vertical name..." limit="5" />
              </div>

              <div className="filter-el">
                <h4>
                  City:
                </h4>
                <RefinementList searchable="true" searchablePlaceholder="Enter a city..." attribute="city" />
              </div>

              <div className="filter-el">
                <h4>
                  City:
                </h4>
                <RefinementList searchable="true" searchablePlaceholder="Enter a state..." attribute="state" />
              </div>

              <div className="filter-el">
                <h4>
                  Country:
                </h4>
                <RefinementList attribute="country" />
              </div>

              <div className="filter-el">
                <h4>
                  Program Status:
                </h4>
                <RefinementList attribute="programType" transformItems={transformItems} />
              </div>

            </div>
            <div className="search-panel__results">
              <SearchBox placeholder="Enter an program name..." className="searchbox" />

              <Hits hitComponent={Hit} />

              <div className="pagination">
                <Pagination />
              </div>
            </div>

          </div>
        </InstantSearch>
      </div>
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
      <a href={hit['webSite']} target="_blank">
        <ImageWithFallback src={hit.logo} width="80" alt={hit.name} />
      </a>
      <div className="element">
        <h1>
          <Highlight attribute="name" hit={hit} />
        </h1>
        <p>
          <Highlight attribute="description" hit={hit} />
        </p>
        <p>
          <b>Location:</b> <Highlight attribute="city" hit={hit} />, <Highlight attribute="state" hit={hit} /> <Highlight attribute="country" hit={hit} /><br/>
          <b>Program Type:</b> <Highlight attribute="programType" hit={hit} /><br/>
          <b>Type:</b> {hit['type']}, 
          <b>Industry:</b> {hit['industry']}, 
          <b>Investment Stages:</b> {hit['stages']}
        </p>
      </div>
    </article>
  );
}
