import clubInfoAndEvents from "../utils/club-info-and-events.js";

export default async function metalClub() {
  const eventsHtml = await clubInfoAndEvents('fg5i');

  // Slideshow-logik körs EFTER att HTML har laddats
  setTimeout(() => {
    let slideIndex = 1;


    //För att kunna klicka på ett event och boka det på min sida
    const eventEls = document.querySelectorAll(".event");
    eventEls.forEach((eventEl) => {
      eventEl.style.cursor = "pointer";

      // När ett event klickas, gå direkt till bokningssidan och visa priser
      eventEl.addEventListener("click", () => {
        const title = eventEl.querySelector("h3")?.textContent || "";
        // Förifyll bokningssidan via sessionStorage så den kan visa priser direkt
        const clubId = 'fg5i'; // jazz-klubbens id
        const eventId = eventEl.dataset.eventId || null;
        // Generera ett pris (samma logik som bokningssidan använder)
        const pris = sessionStorage.getItem('eventPris');
        const prefill = { clubId, eventId, eventName: title, pris };
        sessionStorage.setItem('prefillBooking', JSON.stringify(prefill));
        // Navigera till bokningssidan (hash)
        location.hash = 'eventbokare';
      });
    });

    // Lägg till event listeners på knapparna
    const prevButton = document.querySelector('.prev');
    const nextButton = document.querySelector('.next');
    const dots = document.querySelectorAll('.dot');

    console.log('Prev button:', prevButton);
    console.log('Next button:', nextButton);

    if (prevButton) {
      prevButton.addEventListener('click', () => {
        console.log('Previous clicked!');
        plusSlides(-1);
      });
    }
    if (nextButton) {
      nextButton.addEventListener('click', () => {
        console.log('Next clicked!');
        plusSlides(1);
      });
    }

    dots.forEach((dot, index) => {
      dot.addEventListener('click', () => currentSlide(index + 1));
    });

    // Next/previous controls
    function plusSlides(n) {
      console.log('plusSlides called with:', n);
      showSlides(slideIndex += n);
    }

    // Thumbnail image controls
    function currentSlide(n) {
      showSlides(slideIndex = n);
    }

    function showSlides(n) {
      let i;
      let slides = document.getElementsByClassName("mySlides");
      let dots = document.getElementsByClassName("dot");

      console.log('showSlides called, n:', n, 'slides found:', slides.length);

      if (n > slides.length) { slideIndex = 1; }
      if (n < 1) { slideIndex = slides.length; }
      for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
      }
      for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
      }
      if (slides.length > 0) {
        slides[slideIndex - 1].style.display = "block";
        if (dots.length > 0) {
          dots[slideIndex - 1].className += " active";
        }
      }
    }

    // Visa första bilden
    showSlides(slideIndex);
  }, 500); // Ökat till 500ms för att ge DOM tid att ladda


  // HTML för metalclub
  return `
  <div class="image-background">
  </div>
  <div class="container">
  <div class="main-text">
  <h1> Metal Club </h1>
  <p> Hos oss pulserar mörkret, energin och gemenskapen. Metal-club är mötesplatsen för alla som älskar tung musik - från klassisk heavy metal till brutal death, black och allt däremellan.</p> <p> Här hittar du kommande spelningar, klubbkvällar och specialevent med både etablerade band och nya talanger på uppgång.</p> <p> Vår scen vibrerar av passion, volym och äkta metalanda. Vill du säkra din plats? Boka biljetter direkt här på sidan och håll koll på nya event - vi uppdaterar kalendern löpande.</p><br><br><p> Kom för musiken. Stanna för gemenskapen.
Metal-club - där metal lever.</p>
</div>
  <h2 class="listen-now"> CURRENT<br>ARTISTS </h2><br>
  <!-- Slideshow container -->
<div class="slideshow-container">

  <!-- Full-width images with number and caption text -->
<div class="mySlides fade">
    <img src="https://media.revolvermag.com/smaecrmuhw/styles/article-banner/2024/07/11/sleep-token_2024_tour_credit_adamross_williams.jpg.webp?t=e6588d3c.webp" style="width:100%">
    <div class="text">SLEEP TOKEN</div>
  </div>

  <div class="mySlides fade">
    <img src="https://m.media-amazon.com/images/M/MV5BNDkyMTVkZWEtNjgzMy00OWE4LTg0ZDAtMzQwNWI5NmVhOTRiXkEyXkFqcGc@._V1_.jpg" style="width:100%">
    <div class="text">BLACK SABBATH</div>
  </div>

  <div class="mySlides fade">
    <img src="https://dynamicmedia.livenationinternational.com/Media/o/i/u/f096beaa-1c5b-4adf-a906-6855fe392ce1.jpg" style="width:100%">
    <div class="text">IN FLAMES</div>
  </div>

  <div class="mySlides fade">
    <img src="https://i.scdn.co/image/ab6761610000e5ebf9978ad4808f6f2723124d19" style="width:100%">
    <div class="text">IRON MAIDEN</div>
  </div>

  <!-- Next and previous buttons -->
  <a class="prev">&#10094;</a>
  <a class="next">&#10095;</a>
</div>
<br>

  <h2 class="live-shows"> LIVE<br>SHOWS </h2><br>
  <div class="wrapper">
  <div class="event-wrapper">
    ${eventsHtml}
  </div>
  </div>
      <section class="contact">
      <h2>Kontakta oss</h2>
      <p>Email: info@metalklubben.se</p>
      <p>Telefon: 08-123 45 67</p>
    </section>
  </div>

  `;

}