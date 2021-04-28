var chai = require('chai')
var assert = chai.assert;
global.$ = global.jQuery = require('jquery');
const assert = require('chai').assert;
var accountList = ["Philip", "Sean", "Weston"];
(function(){
  'use strict';
  var config;
  var signatureList;

  // Code by Philip
  Office.onReady($.when(getSignatures("signature")).then(storeSignatures));



  Office.initialize = function(reason){
    jQuery(document).ready(function(){

      config = getConfig();

      // Code by Phillip - Functionality for account selection via dropdown menu within taskpane
      if(isAccountSelected == false){
      buildAccountList('#dropdown-menu', accountList, signatureList);
      $('#account-selection').toggle(true);
      $('#signature-content').toggle(false);
      }

      // Code by Philip - Insert Signature button functionality for taskpane
      $('#insert-signature').on('click', function(){

        //var signature = getSelectedSignature();
        var signature = signatureList[getRadioID()];
        var selectedSignature = "<br> " + signature + " <br>";
        Office.context.mailbox.item.body.setSelectedDataAsync(selectedSignature, {coercionType: 'html'});

      });


      $('#random-signature').on('click', function(){
        // Code by Sean and Philip
            var accountSigs = getAccountIndices(getAccount());
            console.log(accountSigs);
            //code by Sean - floor method to round to integer for random function to grab index of list or array
            var randomNumber = Math.floor(Math.random() * (accountSigs.length));
            randomNumber = accountSigs[randomNumber];
            //code by Phillip to grab the break point tags from HTML formatting
            var randomSignature = "<br> " + signatureList[randomNumber] + " <br>";
            Office.context.mailbox.item.body.setSelectedDataAsync(randomSignature, {coercionType: 'html'});
      });

      // Code by Philip - Save signature button functionality
      $('#save-signature').on('click', function(){
        //variable for new signature
        var newSig = $('#new-signature').val();

        $.ajax({
          url: "https://localhost:3000/set-signature?newSignature=" + newSig,
          type: "GET"
        })
        //Build signature list functionality
        buildSignatureList('#signatures-list', signatureList);
      })


      //Written by Jose with the help of Weston - Delete signature from list functionality
      $('#delete-signature').on('click', function(){

/* - Deprecated code -
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
        //Build signature list functionality
        buildSignatureList('#signatures-list', signatureList);
      });
    });
  };

  // Code by Philip - Functionality to store signature and split by the newline character
  function storeSignatures(demsigs)
  {
    console.log(demsigs);
    signatureList = demsigs.split("\n");
  }
  describe('Account list', function () {
    it('Holds all the accounts', function () { 
      assert.equal(accountList.length, 3);
    });
  });

})();