
(function(){
  'use strict';
  var config;
  var signatureList;
  var settingsDialog;

  // Obtain the signature list right from the start
  $.when(getSignatures("signature")).then(storeSignatures);

  Office.initialize = function(reason){
    jQuery(document).ready(function(){


      config = getConfig();
      buildSignatureList('#signatures-list', signatureList);
      
      /*// loading in signatures for selection
      $.ajax({
        url: "https://localhost:3000/signature",
        type: "GET",
        success: function(result){
          var sigID = 0;
          var signatures = result.split('\n');
          console.log('hi');
          signatures.forEach(sig => {
            
            var SigList = $('<div/>').appendTo("#signatures-list")

            var radioItem = $('<input>').addClass('ms-ListItem').addClass('is-selectable').val(sigID).attr('onclick', "onSignatureSelected()")
            .attr('type', 'radio').attr('name', 'signature-radio').attr('tabindex', 0).attr('id', 'radioButton').appendTo(SigList);
            console.log(radioItem.val());

            var desc = $('<span/>')
            .addClass('text-dark').addClass('rounded').addClass('signature-padding').addClass('is-selectable')
            .text(sig)
            .appendTo(SigList);
            //$('#signatures-list').append(sig);

            sigID += 1;
          });
        }

        
      });


      $('#signatures-list').on('click', function(){
        console.log('selected');
        onSignatureSelected();
      })*/

      $('#insert-signature').on('click', function(){
        var sigID = -1;
        var radioButtons = document.getElementsByName('signature-radio');
        var i = 0;
        while (i < radioButtons.length) {
          if(radioButtons[i].checked)
          {
            sigID = i;
            break;
          }
          i++;
        }
        

        var selectedSignature = "<br> " + signatureList[sigID] + " <br>";

        Office.context.mailbox.item.body.setSelectedDataAsync(selectedSignature, {coercionType: 'html'});

      });
      
      $('#random-signature').on('click', function(){
        $.ajax({
          url: "https://localhost:3000/signature",
          type: "GET",
          success: function(result){
            // Lines 51 - 53 made by Weston
            var signatures = result.split('\n');
            var randomNumber = Math.floor(Math.random() * (signatures.length));

            var randomSignature = "<br> " + signatures[randomNumber] + " <br>";

            Office.context.mailbox.item.body.setSelectedDataAsync(randomSignature, {coercionType: 'html'});
          }
        });
      });
      $('#save-signature').on('click', function(){

        var newSig = $('#new-signature').val();

        $.ajax({
          url: "https://localhost:3000/set-signature?newSignature=" + newSig,
          type: "GET"
        })
      })

      /*$('#radioButton').on('click', function() {
        console.log("clicked");
        onSignatureSelected();
      })*/

      
      $('#manage-signatures').on('click', function(){

        window.open("https://localhost:3000/src/taskpane/editSignature.html", "", "width=400, height=800");
      })

      // When insert button is selected, build the content
      // and insert into the body.
      //$('#insert-button').on('click', function(){
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

           //         Office.context.mailbox.item.body.setSelectedDataAsync("Philip Marshall");
                /*});
              } else {
                showError('Could not create insertable content: ' + error);
              }
            });
          } else {
            showError('Could not retrieve gist: ' + error);
          }
        });*/
      //});

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

  function onSignatureIsSelected(){
    $('#insert-signature').removeAttr('disabled');
    $(this).children('.ms-ListItem').addClass('is-selected').attr('checked', 'checked');
  }
  
  function onGistSelected() {
    $('#insert-signature').removeAttr('disabled');
    $('#manage-signatures').removeAttr('disabled');
    $('.ms-ListItem').removeClass('is-selected').removeAttr('checked');
    $(this).children('.ms-ListItem').addClass('is-selected').attr('checked', 'checked');
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

  function storeSignatures(demsigs)
  {
    signatureList = demsigs.split("\n");
  }
})();
