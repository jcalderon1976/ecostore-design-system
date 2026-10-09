import { useEffect, useRef } from "react";
import { SITE } from "../site";
import { initEcoHero } from "./initEcoHero";
import "./EcoHero.css";

const img = (p: string) => `${SITE.base}images/hero/${p}`;

/** Hero de scroll: cielo, logo, casa y hotspots de productos (Example 7). */
export function EcoHero() {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!rootRef.current) return;
    return initEcoHero(rootRef.current);
  }, []);

  return (
    <section
      ref={rootRef}
      className="eco-hero"
      aria-label="Explora un hogar EcoStore"
    >
      <div className="eco-hero-overlay-until" aria-hidden="true" />
      <a
        className="skip"
        href="#eco-lo-tiene"
        onClick={(e) => {
          e.preventDefault();
          document
            .getElementById("eco-lo-tiene")
            ?.scrollIntoView({ behavior: "smooth", block: "start" });
        }}
      >
        Saltar la presentación
      </a>

      <div className="stage">
        <div className="layer bg" data-el="bg">
          <img src={img("background.jpg")} alt="" width={567} height={1024} decoding="async" />
        </div>
        <div className="layer rays" aria-hidden="true" />
        <div
          className="layer particles"
          data-el="particles"
          aria-hidden="true"
        />

        <div className="layer intro" data-el="intro">
          <img
            className="intro__logo"
            data-el="heroLogo"
            src={img("hero-logo.png?v=3")}
            alt="EcoStore"
            width={1678}
            height={937}
            decoding="async"
          />
          <h1 data-el="headline">
            <span className="hl">
              <span>Tu tienda de soluciones</span>
            </span>
            <span className="hl">
              <span>en Eficiencia Energética</span>
            </span>
            <span className="hl">
              <span>y Conservación de Agua</span>
            </span>
          </h1>
        </div>

        <div className="layer house-wrap">
          <div className="house" data-el="house">
            <div className="ground-glow" />
            <img
              src={img("house.png")}
              alt="Casa equipada con productos EcoStore"
              width={1536}
              height={1024}
              fetchPriority="high"
              decoding="async"
            />
          </div>
        </div>

        <div className="layer caption" data-el="caption">
          <span>
            Producto <b data-el="capNum">1</b> de <span data-el="capTotal" /> ·{" "}
            <span data-el="capName" />
          </span>
        </div>
        <div className="rail" data-el="rail" />

        <div className="layer scroll-hint" data-el="hint">
          <i />
          Desliza para explorar
        </div>

        <a className="mobile-card" data-el="mobileCard" />
      </div>
    </section>
  );
}
