(function(){
  'use strict';

  var config;
  var settingsDialog;

  Office.initialize = function(reason){

    jQuery(document).ready(function(){


      config = getConfig();

      // Check if add-in is configured.
      if (config && config.gitHubUserName) {
        // If configured, load the gist list.
        loadGists(config.gitHubUserName);
      } else {
        // Not configured yet.
        $('#not-configured').show();
      }

      $('#insert-signature').on('click', function(){
        Office.context.mailbox.item.body.setSelectedDataAsync("'Philip Marshall is the best' - not philip");
      });

      $('#random-signature').on('click', function(){
        Office.context.mailbox.item.body.setSelectedDataAsync(randomSignature());
      });

      $('#manage-signatures').on('click', function(){

        window.open("https://localhost:3000/src/taskpane/editSignature.html", "", "width=400, height=800");
      })

      // When insert button is selected, build the content
      // and insert into the body.
      $('#insert-button').on('click', function(){
        /*var gistId = $('.ms-ListItem.is-selected').val();
        getGist(gistId, function(gist, error) {
          if (gist) {
            buildBodyContent(gist, function (content, error) {
              if (content) {
                Office.context.mailbox.item.body.setSelectedDataAsync(content,
                  {coercionType: Office.CoercionType.Html}, function(result) {
                    if (result.status === Office.AsyncResultStatus.Failed) {
                      showError('Could not insert gist: ' + result.error.message);
                    }*/

                    Office.context.mailbox.item.body.setSelectedDataAsync("Philip Marshall");
                /*});
              } else {
                showError('Could not create insertable content: ' + error);
              }
            });
          } else {
            showError('Could not retrieve gist: ' + error);
          }
        });*/
      });

      // When the settings icon is selected, open the settings dialog.
      $('#settings-icon').on('click', function(){
        // Display settings dialog.
        var url = new URI('../src/settings/dialog.html').absoluteTo(window.location).toString();
        if (config) {
          // If the add-in has already been configured, pass the existing values
          // to the dialog.
          url = url + '?gitHubUserName=' + config.gitHubUserName + '&defaultGistId=' + config.defaultGistId;
        }

        var dialogOptions = { width: 20, height: 40, displayInIframe: true };

        Office.context.ui.displayDialogAsync(url, dialogOptions, function(result) {
          settingsDialog = result.value;
          settingsDialog.addEventHandler(Office.EventType.DialogMessageReceived, receiveMessage);
          settingsDialog.addEventHandler(Office.EventType.DialogEventReceived, dialogClosed);
        });
      })
    });
  };
  
  function loadGists(user) {
    $('#error-display').hide();
    $('#not-configured').hide();
    $('#gist-list-container').show();

    getUserGists(user, function(gists, error) {
      if (error) {

      } else {
        $('#gist-list').empty();
        buildGistList($('#gist-list'), gists, onGistSelected);
      }
    });
  }

  function onGistSelected() {
    $('#insert-signature').removeAttr('disabled');
    $('#manage-signatures').removeAttr('disabled');
    $('.ms-ListItem').removeClass('is-selected').removeAttr('checked');
    $(this).children('.ms-ListItem').addClass('is-selected').attr('checked', 'checked');
  }

  function onSignatureSelected() {
    $('insert-signature').removeAttr('disabled');
  }

  function showError(error) {
    $('#not-configured').hide();
    $('#gist-list-container').hide();
    $('#error-display').text(error);
    $('#error-display').show();
  }

  function receiveMessage(message) {
    config = JSON.parse(message.message);
    setConfig(config, function(result) {
      settingsDialog.close();
      settingsDialog = null;
      loadGists(config.gitHubUserName);
    });
  }

  function dialogClosed(message) {
    settingsDialog = null;
  }
})();

 // Weston's code
 var sigs = [
  "\"Dude, suckin' at something is the first step at being sorta good at something.\"<br>-  Jake <small><em>(Adventure Time)</em></small>",
  "\"We can only see a short distance ahead, but we can see plenty that needs to be done.\"<br> -Alan Turing",
  "\"No computer is ever going to ask a new, reasonable question. It takes trained people to do that.\"<br> -Grace Hopper",
  "\"Computer Science is the operating system for all innovation.\"<br> -Steve Ballmer",
  "\"A goal is a dream with a deadline.\"<br> – Napoleon Hill",
  "\"Logic will get you from A to B. Imagination will take you everywhere.\"<br> –Albert Einstein",
  "\"Paying attention to simple little things that most men neglect makes a few men rich.\"<br> –Henry Ford",
  "\"Action is the foundational key to all success.\"<br> -Pablo Picasso",
  "\"No act of kindness, no matter how small, is ever wasted.\"<br> –Aesop",
  "\"Computers are like Old Testament gods; lots of rules and no mercy.\"<br> -Joseph Campbell",
  "\"The most important thing about a technology is how it changes people.\"<br> -Jaron Lanier",
  "\"R2-D2, you know better than to trust a strange computer.\"<br> -C3P0",
  "\"Technology is making the world more unequal. Only technology can fix this.\"<br> -Cory Doctorow",
  "\"Our greatest weakness lies in giving up. The most certain way to succeed is always to try just one more time.\"<br>- Thomas A. Edison",
  "\"Never give up, for that is just the place and time that the tide will turn.\"<br>- Harriet Beecher Stowe",
  "\"If you always put limit on everything you do, physical or anything else. It will spread into your work and into your life. There are no limits. There are only plateaus, and you must not stay there, you must go beyond them.\"<br>- Bruce Lee",
  ]

function randomSignature() {
  var randomNumber = Math.floor(Math.random() * (sigs.length));
  return sigs[randomNumber];
}

module.exports = {
  randomSignature : randomSignature
}