var urlId = "1";
var slideAtual = "0";
var proximoSlide = "1";
var travaTeclado = false;
var carBloqTeclado = false;
var slideAnterior;
var slideMenu = 2;
var menuAtivo = false;
var SEARCH_CONTENT_SLIDE = 100;
var DEFAULT_TIMER = 5000;
var BASE_AUDIO_PATH = "assets/audios/";
var ACTIVE_FLOW;
var REMEMBER_MUTE_AUDIO = true;
var status_scorm = {};
var slide_key_scorm = "current_slide";
var player;
var player_muted = false;

var set_audio_player = function (audio_path) {
  $("#audio-holder").empty();
  let audio_player;
  let audio_player_html =
    '<div class="audio-bg d-block mx-auto"><div class="player-with-download"><audio crossorigin><source src="' +
    audio_path +
    '" type="audio/mpeg"/></audio></div></div>';

  $("#audio-holder").append(audio_player_html);

  GreenAudioPlayer.init({
    selector: ".player",
    stopOthersOnPlay: true,
  });
  GreenAudioPlayer.init({
    selector: ".player-with-download",
    stopOthersOnPlay: true,
    showDownloadButton: true,
    enableKeystrokes: true,
  });
  GreenAudioPlayer.init({
    selector: ".player-with-accessibility",
    stopOthersOnPlay: true,
    enableKeystrokes: true,
  });

  audio_player = document.querySelector(".green-audio-player");
  player = audio_player.querySelector("audio");

player.addEventListener("ended", function () {
    $(".footProx").show("slow");
    show_next_menu_item();
  });

  let volume_button = $(audio_player).find(".volume__button");

  if (REMEMBER_MUTE_AUDIO) {
    if (player_muted) {
      $(volume_button).addClass("open");
      player.muted = player_muted;
    }
  } else {
    player_muted = false;
  }

  $(volume_button).on("click", function () {
    player_muted = !player_muted;
    player.muted = player_muted;
    if (!player_muted) {
      $(volume_button).removeClass("open");
    } else {
      $(volume_button).addClass("open");
    }
  });

  player.play();
  if (!player.paused) {
    $(".play-pause-btn").click();
    $(".play-pause-btn").click();
  }
};

var show_next_menu_item = function () {
  let next_slide_menu_item = $("#menu-content-holder").find("li")[
    Number(slideAtual) + 1
  ];
  $(next_slide_menu_item).show();
};

var after_load_slide = function () {
  clearTimeout(ACTIVE_FLOW);
  ACTIVE_FLOW = null;
  let sound_attr = $("#slide" + slideAtual).attr("sound");
  let collection = $("#menu-content-holder").find("li");

  $.each(collection, function (index, element) {
    if (index <= Number(slideAtual)) {
      $(element).show();
    } else {
      $(element).hide();
    }
  });

  try {
    player.pause();
  } catch (e) {}

  switch (sound_attr) {
    case "hide":
      $(".audio-holder").hide();
      $(".footProx").show();
      break;
    case "default":
      $(".audio-holder").hide();
      $(".footProx").hide();
      no_audio_timer();
      break;
    default:
      $(".audio-holder").show();
      $(".footProx").hide();
      audio_timer(sound_attr);
      break;
  }
};



var audio_timer = function (sound_attr) {
  if (sound_attr !== null && sound_attr !== "" && sound_attr !== undefined) {
    let audio_path = BASE_AUDIO_PATH + sound_attr;
    set_audio_player(audio_path);
  } else {
    // Esqueceu de colocar o arquivo de audio
    $(".audio-holder").hide();
    no_audio_timer();
  }
};

var no_audio_timer = function () {
  ACTIVE_FLOW = setTimeout(() => {
    $(".footProx").show("slow");
    show_next_menu_item();
    ACTIVE_FLOW = null;
  }, DEFAULT_TIMER);
};


