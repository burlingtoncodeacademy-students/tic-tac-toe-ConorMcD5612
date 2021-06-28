//Open footer by clicking button function
function openFooter() {
    let footer  = document.querySelector('footer');
    console.log('working')
    if (footer.style.display === "flex") {
      footer.style.display = "none";
    } else {
      footer.style.display = "flex";
      
    }
  }

  function openNav(){
    let nav = document.querySelector('.menu-container')
    if(nav.style.display ==="flex") {
      nav.style.display = 'none';
    } else {
      nav.style.display ="flex"
    }
  }


  // Audio play function

  // function playAudio() {
  //   console.log('work')
    
  //   audio.play()
  //   console.log(audio.play() === true)
  // }
 
  let audio =document.querySelector('.shanty')

  function playPauseAudio() {
    return audio.paused ? audio.play() : audio.pause();
  }