import React from "react";
import GalleryContainer from "./artistgallery.js";
import Parser from "html-react-parser";
  

const Artist = ({ artistData }) => (
  <article>
    <div className="container-fluid">
      <div className="row">
        <div
          id="gmg-artist-heading"
          style={{
            backgroundImage: {artistData.bannerUrl}
          }}
        >
          <h1 id="gmg-artist-name">
            {artistData.firstName} {artistData.lastName}
          </h1>
          <span id="gmg-artist-tagline">{artistData.tagline}</span>
        </div>
      </div>
    </div>

    <div className="container">
      <section>
        <div className="row">
          <div className="col-md-12">
            <h2 className="text-center">About {artistData.firstName}</h2>
            <img
              id="gmg-artist-portrait"
              className="col-md-5 col-sm-12 pull-left img-responsive"
              src={artistData.portraitSrc}
              alt=
            />
            {Parser(artistData.bioText)}
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-center">Gallery</h2>
        <GalleryContainer galleryItems={artistData.galleryItems} />
      </section>
    </div>
  </article>
);

export default Artist;
