
(function(){
  'use strict';
  var config;
  var signatureList;

  /** Code by Philip */
  Office.onReady($.when(getSignatures("signature")).then(storeSignatures));



  Office.initialize = function(reason){
    jQuery(document).ready(function(){

      config = getConfig();

      /** Code by Philip - Functionality for account selection via dropdown menu within taskpane */
      if(getIsAccountSelected() == false){
      console.log("account not selected");
      buildAccountList('#dropdown-menu', signatureList);
      $('#account-selection').toggle(true);
      $('#signature-content').toggle(false);
      }
      else
      {
        console.log("account is selected");
        buildAccountList('#dropdown-menu', signatureList);
        updateAccountSelectionStatus();
      }


      /** Code by Philip - Insert Signature button functionality for taskpane */
      $('#insert-signature').on('click', function(){

        /** Deprecated - var signature = getSelectedSignature(); */
        var signature = signatureList[getRadioID()];
        var selectedSignature = "<br> " + signature + " <br>";
        Office.context.mailbox.item.body.setSelectedDataAsync(selectedSignature, {coercionType: 'html'});

      });

      /** Code by Philip - Log out button for the taskpane */
      $('#log-out').on('click', function(){
        logOut();
      });

      $('#random-signature').on('click', function(){
        /** Code by Sean and Philip */
            var accountSigs = getAccountIndices(getAccount());
            console.log(accountSigs);
            /** Code by Sean - floor method to round to integer for random function to grab index of list or array */
            var randomNumber = Math.floor(Math.random() * (accountSigs.length));
            randomNumber = accountSigs[randomNumber];
            /** Code by Philip to grab the break point tags from HTML formatting */
            var randomSignature = "<br> " + signatureList[randomNumber] + " <br>";
            Office.context.mailbox.item.body.setSelectedDataAsync(randomSignature, {coercionType: 'html'});
      });

      /** Code by Philip - Save signature button functionality */
      $('#save-signature').on('click', function(){
        /** variable for new signature */
        var newSig = $('#new-signature').val();

        $.ajax({
          url: "https://localhost:3000/set-signature?newSignature=" + getAccount() + "-" + newSig,
        })
        /** Build signature list functionality */
        buildSignatureList('#signatures-list', signatureList, getAccount());

      })


      /** Written by Jose with the help of Weston - Delete signature from list functionality */
      $('#delete-signature').on('click', function(){

/** - Deprecated code -
        var signID = - 1;
        var deleteSig;
        var radioButtons = document.getElementsByName('signature-radio');
        var i = 0;
        while (i < radioButtons.length){
          if(radioButtons[i].checked){
            signID = i;
            break;
          }
          i++;
      }

*/

      $.ajax({
        url: "https://localhost:3000/delete-signature?deleteSignature=" + getRadioID() /*signID*/,
        type: "GET"
      });
        /** Build signature list functionality */
        buildSignatureList('#signatures-list', signatureList, getAccount());
      });
    });
  };

  /** Code by Philip - Functionality to store signature and split by the newline character */
  function storeSignatures(signatures)
  {
    signatureList = signatures.split("\n");
  }

  // Code by Philip with the help of stack overflow from https://stackoverflow.com/questions/14659098/checking-if-a-textbox-is-empty-in-javascript
  function checkTextField(field) {
    $('#save-signature').removeAttr('disabled');

  }
})();
