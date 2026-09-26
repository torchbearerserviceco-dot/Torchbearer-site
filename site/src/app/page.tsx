import Image from "next/image";
import QuoteForm from "@/components/QuoteForm";
import { oswald, barlow } from "@/lib/fonts";

const statLabelStyle: React.CSSProperties = {
  font: `600 12px/1.3 ${barlow}`,
  letterSpacing: ".06em",
  textTransform: "uppercase",
  color: "#8fa5c0",
};

const statValueStyle: React.CSSProperties = {
  font: `700 30px/1 ${oswald}`,
  color: "#F4C869",
};

const eyebrowStyle: React.CSSProperties = {
  font: `600 13px/1 ${oswald}`,
  letterSpacing: ".22em",
  textTransform: "uppercase",
  color: "#F4C869",
};

const checklistIconStyle: React.CSSProperties = {
  flex: "none",
  width: "34px",
  height: "34px",
  borderRadius: "8px",
  background: "linear-gradient(135deg,#E0A028,#F4C869)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  font: `700 16px/1 ${oswald}`,
  color: "#0c1d39",
};

const checklistTitleStyle: React.CSSProperties = {
  font: `700 17px/1.2 ${oswald}`,
  textTransform: "uppercase",
  color: "#F5ECD6",
};

const checklistBodyStyle: React.CSSProperties = {
  marginTop: "4px",
  font: `500 14.5px/1.5 ${barlow}`,
  color: "#a7b8cd",
};

const medallionStyle: React.CSSProperties = {
  width: "190px",
  height: "190px",
  borderRadius: "999px",
  background:
    "radial-gradient(circle at 50% 30%, rgba(244,200,105,.22) 0%, rgba(12,29,57,0) 62%), #0a1830",
  border: "2px solid #E0A028",
  boxShadow:
    "inset 0 0 0 5px #0a1830, inset 0 0 0 6px rgba(244,200,105,.5), 0 14px 34px rgba(0,0,0,.4)",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  gap: "8px",
  textAlign: "center",
  padding: "18px",
};

const medallionTitleStyle: React.CSSProperties = {
  font: `700 21px/1.1 ${oswald}`,
  letterSpacing: ".04em",
  textTransform: "uppercase",
  color: "#F5ECD6",
};

const medallionSubStyle: React.CSSProperties = {
  font: `500 13px/1.35 ${barlow}`,
  color: "#8fa5c0",
};

const services = [
  { name: "Handyman", sub: "Repairs & punch lists" },
  { name: "Renovation", sub: "Home service & remodel" },
  { name: "Trim & Carpentry", sub: "Custom millwork" },
  { name: "Land Clearing", sub: "Lots, brush & grading" },
  { name: "Fencing", sub: "Privacy, farm & gates" },
  { name: "Sheds & Decks", sub: "Built to last" },
  { name: "Insulation", sub: "Attic to crawlspace" },
  { name: "Fixture Install", sub: "Lighting, fans & more" },
];

const reviews = [
  {
    name: "Kirsten J.",
    project: "Interior trim & decorative moldings",
    quote:
      "Torchbearer removed, replaced, and painted the interior trim and installed the decorative wood panelling on the basement over-head. They were detail-oriented and communicated well, completing my projects at a fair price. I would definitely recommend them to anyone looking to have work done around the house.",
  },
  {
    name: "Kirsten J.",
    project: "Handyman — stair railing & small projects",
    quote:
      "Grant with Torchbearer was very helpful when I needed this stair railing replaced and multiple other small projects completed. Their communication was reliable and the results were what I was looking for. I would reccomend.",
  },
];

export default function Home() {
  return (
    <div style={{ background: "#06122a", fontFamily: barlow, color: "#eaf0f8" }}>
      {/* NAV */}
      <div
        className="tb-nav"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          background: "rgba(6,18,42,.92)",
          borderBottom: "1px solid rgba(169,198,226,.14)",
        }}
      >
        <div className="tb-nav-brand" style={{ display: "flex", alignItems: "center" }}>
          <Image
            src="/logo.png"
            alt="Torchbearer Construction"
            width={375}
            height={485}
            className="tb-nav-logo"
            style={{ width: "auto", display: "block" }}
            priority
          />
          <div style={{ lineHeight: 1 }}>
            <div
              className="tb-nav-title"
              style={{
                fontFamily: oswald,
                fontWeight: 700,
                lineHeight: 1,
                letterSpacing: ".06em",
                textTransform: "uppercase",
                color: "#F4C869",
              }}
            >
              Torchbearer
            </div>
            <div
              className="tb-nav-sub"
              style={{
                fontFamily: oswald,
                fontWeight: 600,
                lineHeight: 1,
                letterSpacing: ".34em",
                textTransform: "uppercase",
                color: "#A9C6E2",
              }}
            >
              Construction
            </div>
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "22px" }}>
          <a
            href="#quote"
            className="tb-nav-cta"
            style={{
              borderRadius: "8px",
              background: "linear-gradient(135deg,#E0A028,#F4C869)",
              color: "#0c1d39",
              fontFamily: oswald,
              fontWeight: 700,
              lineHeight: 1,
              letterSpacing: ".06em",
              textTransform: "uppercase",
              textDecoration: "none",
            }}
          >
            <span className="tb-nav-cta-long">Get a </span>Free Estimate
          </a>
        </div>
      </div>

      {/* HERO + FORM */}
      <div
        id="quote"
        className="tb-section"
        style={{
          scrollMarginTop: "20px",
          position: "relative",
          paddingTop: "64px",
          paddingBottom: "68px",
          background:
            "linear-gradient(to bottom, rgba(169,198,226,0) 80%, rgba(169,198,226,.24) 100%), radial-gradient(120% 90% at 78% 0%, rgba(224,160,40,.16) 0%, rgba(6,18,42,0) 55%), linear-gradient(180deg,#0c1d39 0%, #06122a 100%)",
        }}
      >
        <div style={{ display: "flex", flexWrap: "wrap", gap: "48px", alignItems: "flex-start" }}>
          <div style={{ flex: "1 1 520px", minWidth: "340px" }}>
            <h1 className="tb-hero-h1" style={{ margin: "6px 0 0", color: "#F5ECD6" }}>
              One quote.
              <br />
              <span
                style={{
                  background: "linear-gradient(135deg,#E0A028,#F4C869)",
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  color: "transparent",
                }}
              >
                Not a dime more.
              </span>
            </h1>
            <p
              style={{
                margin: "26px 0 0",
                maxWidth: "490px",
                font: `500 19px/1.55 ${barlow}`,
                color: "#c3d2e4",
              }}
            >
              Somebody Has to Build the Real World.
              <br />
              We light the way forward.
            </p>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "24px",
                marginTop: "34px",
                flexWrap: "wrap",
              }}
            >
              <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                <span style={statValueStyle}>$0</span>
                <span style={statLabelStyle}>Hidden fees</span>
              </div>
              <div style={{ width: "1px", height: "38px", background: "rgba(169,198,226,.2)" }} />
              <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                <span style={statValueStyle}>5 years</span>
                <span style={statLabelStyle}>Experience</span>
              </div>
              <div style={{ width: "1px", height: "38px", background: "rgba(169,198,226,.2)" }} />
              <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                <span style={statValueStyle}>5+</span>
                <span style={statLabelStyle}>Trades under one roof</span>
              </div>
            </div>
          </div>
          <div style={{ flex: "1 1 420px", minWidth: "380px", maxWidth: "500px" }}>
            <div
              style={{
                background: "#F5ECD6",
                borderRadius: "14px",
                padding: "28px 26px",
                boxShadow: "0 30px 70px rgba(0,0,0,.45)",
              }}
            >
              <div
                style={{
                  font: `700 26px/1.05 ${oswald}`,
                  textTransform: "uppercase",
                  color: "#0c1d39",
                }}
              >
                Get your free estimate
              </div>
              <div
                style={{
                  margin: "6px 0 18px",
                  font: `500 14.5px/1.45 ${barlow}`,
                  color: "#5d5644",
                }}
              >
                Tell us what you need — we&rsquo;ll send back one straight
                number.
              </div>
              <QuoteForm theme="onLight" />
            </div>
          </div>
        </div>
      </div>

      {/* WHY + ABOUT */}
      <div
        className="tb-section"
        style={{
          background: "linear-gradient(180deg,#0c1d39,#06122a)",
          borderTop: "1px solid rgba(169,198,226,.1)",
        }}
      >
        <div style={{ display: "flex", flexWrap: "wrap", gap: "48px" }}>
          <div style={{ flex: "1 1 460px", minWidth: "340px" }}>
            <div style={eyebrowStyle}>Why Torchbearer</div>
            <div className="tb-section-h2" style={{ marginTop: "10px", color: "#F5ECD6" }}>
              We light the way forward.
            </div>
            <p
              style={{
                margin: "18px 0 0",
                font: `500 16.5px/1.6 ${barlow}`,
                color: "#a7b8cd",
                maxWidth: "520px",
              }}
            >
              Torchbearer was built on a simple frustration: estimates
              that balloon, contractors who vanish, and prices that change
              halfway through the job. We run it differently — one crew
              accountable for the whole job, from the first walkthrough to
              the last coat of paint.
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: "14px", marginTop: "28px" }}>
              <div style={{ display: "flex", gap: "14px", alignItems: "flex-start" }}>
                <span style={checklistIconStyle}>✓</span>
                <div>
                  <div style={checklistTitleStyle}>The price is the price</div>
                  <div style={checklistBodyStyle}>
                    No fuel surcharges, no &ldquo;unforeseen conditions&rdquo;
                    padding, no change-order games.
                  </div>
                </div>
              </div>
              <div style={{ display: "flex", gap: "14px", alignItems: "flex-start" }}>
                <span style={checklistIconStyle}>✓</span>
                <div>
                  <div style={checklistTitleStyle}>One crew, eight trades</div>
                  <div style={checklistBodyStyle}>
                    Carpentry to clearing — no subcontractor roulette, no
                    finger-pointing.
                  </div>
                </div>
              </div>
              <div style={{ display: "flex", gap: "14px", alignItems: "flex-start" }}>
                <span style={checklistIconStyle}>✓</span>
                <div>
                  <div style={checklistTitleStyle}>Built for pros too</div>
                  <div style={checklistBodyStyle}>
                    Realtors, GCs, and facility managers get the same
                    straight number — on a timeline you can put in a
                    contract.
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            style={{
              flex: "1 1 380px",
              minWidth: "320px",
              display: "flex",
              flexDirection: "column",
              gap: "16px",
              justifyContent: "center",
            }}
          >
            {reviews.map((review) => (
              <div
                key={review.project}
                style={{
                  borderRadius: "12px",
                  background: "#F5ECD6",
                  padding: "22px 24px 24px",
                  boxShadow: "0 20px 50px rgba(0,0,0,.35)",
                }}
              >
                <div
                  aria-label="5 out of 5 stars"
                  style={{ font: `700 18px/1 ${barlow}`, letterSpacing: ".08em", color: "#E0A028" }}
                >
                  ★★★★★
                </div>
                <div
                  style={{
                    marginTop: "12px",
                    font: `500 16.5px/1.55 ${barlow}`,
                    color: "#3f3a2c",
                  }}
                >
                  &ldquo;{review.quote}&rdquo;
                </div>
                <div
                  style={{
                    marginTop: "14px",
                    font: `700 14px/1 ${oswald}`,
                    letterSpacing: ".1em",
                    textTransform: "uppercase",
                    color: "#0c1d39",
                  }}
                >
                  — {review.name}
                </div>
                <div
                  style={{
                    marginTop: "6px",
                    font: `500 13px/1.35 ${barlow}`,
                    color: "#5d5644",
                  }}
                >
                  {review.project} · Review on Angi
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* SERVICES */}
      <div
        className="tb-section"
        style={{
          paddingTop: "64px",
          paddingBottom: "72px",
          background: "#0c1d39",
          borderTop: "1px solid rgba(169,198,226,.12)",
          borderBottom: "1px solid rgba(169,198,226,.12)",
        }}
      >
        <div style={{ textAlign: "center" }}>
          <div style={eyebrowStyle}>What we do</div>
          <div className="tb-section-h2" style={{ marginTop: "10px", color: "#F5ECD6" }}>
            Eight trades. One crew.
          </div>
        </div>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: "22px",
            marginTop: "40px",
            maxWidth: "1060px",
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          {services.map((service) => (
            <div key={service.name} style={medallionStyle}>
              <span style={medallionTitleStyle}>{service.name}</span>
              <span style={medallionSubStyle}>{service.sub}</span>
            </div>
          ))}
        </div>
      </div>

      {/* CTA BAND */}
      <div
        style={{
          padding: "48px",
          background: "linear-gradient(135deg,#E0A028,#F4C869)",
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "20px",
        }}
      >
        <div>
          <div className="tb-cta-h" style={{ color: "#0c1d39" }}>
            Ready for one straight number?
          </div>
          <div
            style={{
              marginTop: "6px",
              font: `600 16px/1.4 ${barlow}`,
              color: "rgba(12,29,57,.75)",
            }}
          >
            Free estimate. One business day. No obligation.
          </div>
        </div>
        <a
          href="#quote"
          style={{
            padding: "16px 30px",
            borderRadius: "10px",
            background: "#0c1d39",
            color: "#F4C869",
            font: `700 16px/1 ${oswald}`,
            letterSpacing: ".06em",
            textTransform: "uppercase",
            textDecoration: "none",
            boxShadow: "0 14px 34px rgba(6,18,42,.35)",
          }}
        >
          Get my free estimate ↑
        </a>
      </div>

      {/* FOOTER */}
      <div
        style={{
          padding: "22px 48px",
          background: "#040d1f",
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "12px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <Image
            src="/logo.png"
            alt=""
            width={375}
            height={485}
            style={{ height: "30px", width: "auto", opacity: 0.85 }}
          />
          <span
            style={{
              font: `600 12px/1 ${oswald}`,
              letterSpacing: ".18em",
              textTransform: "uppercase",
              color: "#8fa5c0",
            }}
          >
            Torchbearer Construction
          </span>
        </div>
        <span style={{ font: `500 13px/1 ${barlow}`, color: "#5c6f8a" }}>
          Greater Knoxville Area, TN · Licensed &amp; insured ·{" "}
          <a
            href="mailto:torchbearerserviceco@gmail.com"
            style={{ color: "#8fa5c0", textDecoration: "none" }}
          >
            torchbearerserviceco@gmail.com
          </a>
        </span>
      </div>
    </div>
  );
}
