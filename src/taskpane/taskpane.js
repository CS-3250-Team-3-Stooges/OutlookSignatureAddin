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
      
      if(isAccountSelected == false){
      buildAccountList('#dropdown-menu', accountList, signatureList);
      $('#account-selection').toggle(true);
      $('#signature-content').toggle(false);
      }
      
      // code by philip
      $('#insert-signature').on('click', function(){

        var radioID = getRadioID();
        console.log(radioID);
        var selectedSignature = "<br> " + radioID + " <br>";
        Office.context.mailbox.item.body.setSelectedDataAsync(selectedSignature, {coercionType: 'html'});

      });
      

      $('#random-signature').on('click', function(){
        // code by sean
            var randomNumber = Math.floor(Math.random() * (signatureList.length));
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

      // written by philip
        $.ajax({
          url: "https://localhost:3000/delete-signature?deleteSignature=" + signID,
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
