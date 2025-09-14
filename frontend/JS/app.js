/*
=========================================
    Running Counter
=========================================
*/ 

document.addEventListener("DOMContentLoaded", () => {
    function counter(id, start, end, duration) {
        let counting = document.getElementById(id);
        let range = end - start;
        let stepTime = Math.abs(Math.floor(duration / range)); 
        let current = start;
        let timer = setInterval(() => {
            current++;
            counting.innerHTML = current;
            if (current >= end) {
                clearInterval(timer);
            }
        }, stepTime);
    }

    counter("count1", 200, 5000, 2000);
    counter("count2", 500, 12000, 20);
    counter("count3", 0, 150, 2000);
    counter("count4", 0, 10, 2000);
});


/*
=========================================
   Testimonial Slider
=========================================
*/

document.addEventListener("DOMContentLoaded", () => {
  const slides = document.querySelectorAll(".caption-template");
  const prevBtn = document.querySelector(".fa-angle-left");
  const nextBtn = document.querySelector(".fa-angle-right");
  let index = 0;

  function showSlide(i) {
    slides.forEach((slide, idx) => {
        // console.log(slide +" "+ idx);
        
      slide.classList.remove("active", "inactive");
      if (idx === i) {
        slide.classList.add("active");
      } else {
        slide.classList.add("inactive");
      }
    });
  }

  function nextSlide() {
    index = (index + 1) % slides.length;
    showSlide(index);
  }

  function prevSlide() {
    index = (index - 1 + slides.length) % slides.length;
    showSlide(index);
  }

  nextBtn.addEventListener("click", nextSlide);
  prevBtn.addEventListener("click", prevSlide);

  // auto-slide
  setInterval(nextSlide, 5000);

  // initialize
  showSlide(index);
});

document.querySelector(".lgn-btn").addEventListener("click",()=>{
  window.location.href="/signin-page/signin.html"
})

function getCookie(name) {
  let value = `; ${document.cookie}`;  
  let parts = value.split(`; ${name}=`); 
  if (parts.length === 2) 
    return parts.pop().split(';').shift(); 
  return null; 
}


document.querySelector(".order-btn").addEventListener("click", async () => {
  try {
    const res = await axios.get("http://localhost:8000/auth", {
      withCredentials: true
    });

    if (res.status === 200) {
      alert("✅ Order placed successfully!");
    }

  } catch (err) {
    if (err.response && err.response.status === 401) {
      console.log(err.response);
      window.location.href = "/signin-page/signin.html";
    } else {
      alert("Something went wrong");
    }
  }
});



