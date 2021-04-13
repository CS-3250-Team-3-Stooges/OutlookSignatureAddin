

/** getSignatures will grab the signature text file and return that string back to the caller for storing
 *  @param {string} endpoint - The endpoint for the url to find the signature file
 */
 function getSignatures (endpoint) {
  var sigList;
  console.log(endpoint);
    return $.ajax({
        url: "https://localhost:3000/" + endpoint,
        type: "GET",
        success: function(result){
        }

      }); 
  }

/** getRadioID will look for the selected radio button on the taskpane and return the id for that signature */
function getRadioID(){
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
  return sigID;
}
 
  /** Takes in html tag and signature list to populate the task pane with signatures
   *  @param {string} parent - Parent is a string that correlated to the id tag for the html div that will be populated with the signatures
   *  @param {String[]} sigList - Signature array containing all the signatures from the text file for population on the taskpane
   */
  function buildSignatureList(parent, sigList) {
    var sigID = 0
    sigList.forEach(function(sig) {
      if(sig != ""){
      var SigList = $('<div/>').appendTo(parent);
  
      var radioItem = $('<input>').addClass('ms-ListItem').addClass('is-selectable').val(sigID).attr('onclick', "onSignatureSelected()")
        .attr('type', 'radio').attr('name', 'signature-radio').attr('tabindex', 0).attr('id', 'radioButton').appendTo(SigList);
        console.log(radioItem.val());

      var desc = $('<span/>')
        .addClass('text-dark').addClass('rounded').addClass('signature-padding').addClass('is-selectable')
        .text(sig)
        .appendTo(SigList);
      sigID = sigID + 1;}
    });
  }
  
  function clearSignatureList(parent){
    $(parent).empty();
  }
  
  module.exports = {
    getSignatures: getSignatures,
    getRadioID: getRadioID,
    buildSignatureList: buildSignatureList,
    clearSignatureList: clearSignatureList
  }