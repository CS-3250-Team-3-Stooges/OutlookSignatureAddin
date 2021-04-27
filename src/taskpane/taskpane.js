var accountList = ["Philip", "Sean", "Weston"];

(function(){
  'use strict';
  var config;
  var signatureList;

  // code by philip
  Office.onReady($.when(getSignatures("signature")).then(storeSignatures));
  


  Office.initialize = function(reason){
    jQuery(document).ready(function(){
      
      config = getConfig();
      
      // code
      if(isAccountSelected == false){
      buildAccountList('#dropdown-menu', accountList, signatureList);
      $('#account-selection').toggle(true);
      $('#signature-content').toggle(false);
      }
      
      // code by philip
      $('#insert-signature').on('click', function(){

        //var signature = getSelectedSignature();
        var signature = signatureList[getRadioID()];
        var selectedSignature = "<br> " + signature + " <br>";
        Office.context.mailbox.item.body.setSelectedDataAsync(selectedSignature, {coercionType: 'html'});

      });
      

      $('#random-signature').on('click', function(){
        // code by sean and philip
            var accountSigs = getAccountIndices(getAccount());
            console.log(accountSigs);
            var randomNumber = Math.floor(Math.random() * (accountSigs.length));
            randomNumber = accountSigs[randomNumber];
            var randomSignature = "<br> " + signatureList[randomNumber] + " <br>";
            Office.context.mailbox.item.body.setSelectedDataAsync(randomSignature, {coercionType: 'html'});
      });
      
      // code by philip
      $('#save-signature').on('click', function(){

        var newSig = $('#new-signature').val();

        $.ajax({
          url: "https://localhost:3000/set-signature?newSignature=" + newSig,
          type: "GET"
        })

        buildSignatureList('#signatures-list', signatureList);
      })


      //Written by Jose with the help of Weston
      $('#delete-signature').on('click', function(){

/*
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
        
        buildSignatureList('#signatures-list', signatureList);
      });
    });
  };

  // code by philip
  function storeSignatures(demsigs)
  {
    console.log(demsigs);
    signatureList = demsigs.split("\n");
  }
})();
