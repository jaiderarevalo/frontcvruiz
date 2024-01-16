import React from "react";
import css from "../images/Habilidades/css.png";
import express from "../images/Habilidades/express-nodejs.png";
import html from "../images/Habilidades/html.png";
import js from "../images/Habilidades/js.png";
import sql from "../images/Habilidades/microsoft-sql-server-logo.png";
import mongo from "../images/Habilidades/mongo db.jpg";
import tailwind from "../images/Habilidades/tailwind.jpg";
import zod from "../images/Habilidades/zod.png";
import typescrip from "../images/Habilidades/Typescript.png";
import nest from "../images/Habilidades/nest-typeorm.jpg";
import code from "../images/code.jpg";

function Skills() {
  return (
    <div style={{ backgroundImage: `url(${code})` }}>
      <section className="flex py-10">
        <h1 className="m-auto text-white text-4xl font-bold">
          Habilidades
        </h1>
      </section>
      <div className="px-10">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10">
          <img className="h-40 m-auto" src={sql} alt="SQL Server" />
          <img className="h-40 m-auto" src={tailwind} alt="Tailwind CSS" />
          <img className="h-40 m-auto" src={zod} alt="Zod" />
          <img className="h-40 m-auto" src={typescrip} alt="TypeScript" />
          <img className="h-40 m-auto" src={nest} alt="Nest.js" />
          <img className="h-40 m-auto" src={express} alt="Express" />
          <img className="h-40 m-auto" src={css} alt="CSS" />
          <img className="h-40 m-auto" src={html} alt="HTML" />
          <img className="h-40 m-auto" src={js} alt="JavaScript" />
          <img className="h-40 m-auto" src={mongo} alt="MongoDB" />
        </div>
      </div>
    </div>
  );
}

export default Skills;
