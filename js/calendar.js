var bookero_id = "dbr1cw2YIlpZ";
var bookero_container = "bookero";
var bookero_type = "calendar";
var bookero_position = "";
var bookero_plugin_css = true;
var bookero_lang = "pl";

var bookero_scripts = document.createElement("script");
bookero_scripts.setAttribute("type", "text/javascript");
bookero_scripts.setAttribute(
  "src",
  "https://www.bookero.pl/plugin/js/bookero-compiled.js"
);
document.body.appendChild(bookero_scripts);

function showBookeroCategory(category) {
  var bookero_interval =
    setInterval(function () {
      if ($('#bookero_form_service').length > 0) {
        $.each($('#bookero_form_service optgroup'), function () {
          var label = $(this).prop('label');
          if (label.indexOf(category) == -1) {
            $(this).hide();
            reloadCalendar();
          }
        }
        );
        clearInterval(bookero_interval);
      }
    }, 500);
}

function reloadCalendar() {
  $("#bookero_form_service option[value='3468']").hide();
  $("#bookero_form_service option[value='2707']").prop("selected", true);
  if ("createEvent" in document) {
    var evt = document.createEvent("HTMLEvents");
    evt.initEvent("change", false, true);
    document.getElementById('bookero_form_service').dispatchEvent(evt);
  }
  else {
    document.getElementById('bookero_form_service').fireEvent("onchange");
  }
}

showBookeroCategory('Szkolenia i warsztaty');

