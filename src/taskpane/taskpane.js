
(function(){
  'use strict';
  console.log("dffgfg");
  var config;
  var settingsDialog;

  Office.initialize = function(reason){
    console.log("dffgfg");
    jQuery(document).ready(function(){


      config = getConfig();

      // loading in signatures for selection
      $.ajax({
        url: "https://localhost:3000/signature",
        type: "GET",
        success: function(result){
          var signatures = result.split('\n');
          console.log('hi');
          signatures.forEach(sig => {
            
            var SigList = $('<div/>').appendTo("#signatures-list")

            var radioItem = $('<input>').addClass('ms-ListItem').addClass('is-selectable')
            .attr('type', 'radio').attr('name', 'signatures').attr('tabindex', 0).appendTo(SigList).text(sig); // DONT FORGET TO ADD ID WHEN YOU MAKE THE SIGNATURE CLASS OR ENUM!!!!!

            var desc = $('<span/>')
            .addClass('text-dark').addClass('rounded').addClass('signature-padding')
            .text(sig)
            .appendTo(SigList);
            //$('#signatures-list').append(sig);
          });
        }
      });

      console.log("still alive");
      

      $('#insert-signature').on('click', function(){
        Office.context.mailbox.item.body.setSelectedDataAsync("'Philip Marshall is the best' - not philip");
      });
      
      $('#random-signature').on('click', function(){
        $.ajax({
          url: "https://localhost:3000/signature",
          type: "GET",
          success: function(result){
            // Lines 51 - 53 made by Weston
            var signatures = result.split('\n');
            var randomNumber = Math.floor(Math.random() * (signatures.length));
            Office.context.mailbox.item.body.setSelectedDataAsync(signatures[randomNumber]);
          }
        });
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
