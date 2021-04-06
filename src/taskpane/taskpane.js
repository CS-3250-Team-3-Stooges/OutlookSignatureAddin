
(function(){
  'use strict';
  var config;
  var signatureList;

  $.when(getSignatures("signature")).then(storeSignatures);
 
  Office.initialize = function(reason){
    jQuery(document).ready(function(){
      
      config = getConfig();
      
      buildSignatureList('#signatures-list', signatureList);


      $('#insert-signature').on('click', function(){

        var radioID = getRadioID();
        var selectedSignature = "<br> " + signatureList[radioID] + " <br>";
        Office.context.mailbox.item.body.setSelectedDataAsync(selectedSignature, {coercionType: 'html'});

      });
      
      $('#random-signature').on('click', function(){
            var randomNumber = Math.floor(Math.random() * (signatureList.length));
            var randomSignature = "<br> " + signatureList[randomNumber] + " <br>";
            Office.context.mailbox.item.body.setSelectedDataAsync(randomSignature, {coercionType: 'html'});
      });
      
      $('#save-signature').on('click', function(){

        var newSig = $('#new-signature').val();

        $.ajax({
          url: "https://localhost:3000/set-signature?newSignature=" + newSig,
          type: "GET"
        })

        buildSignatureList('#signatures-list', signatureList);
      })

      $('#manage-signatures').on('click', function(){

        window.open("https://localhost:3000/src/taskpane/editSignature.html", "", "width=400, height=800");
      })

    });
  };

  function storeSignatures(demsigs)
  {
    signatureList = demsigs.split("\n");
  }
})();
