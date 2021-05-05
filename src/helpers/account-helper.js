var isAccountSelected = false;
var accountSelected = "";
var signatureList;
var accountList = [];

$.ajax({
  url: "https://localhost:3000/accounts",
  type: "GET",
  success: function(result){
    result.forEach(account => {
      accountList.push(account["username"]);
      if (account["islogged"] == "1"){
        isAccountSelected = true;
        accountSelected = account["username"];
        console.log(account["username"] + "is logged in");
      }
    });
  }
}); 

function buildAccountList(parent, signaturesForMe) {
    signatureList = signaturesForMe;
    var acctID = 0
    accountList.forEach(function(acct) {
      var AcctList = $('<div>').addClass('form-check').appendTo(parent);

      var radioItem = $('<input>').addClass('form-check-input').attr('onclick', "onAccountSelected()")
        .attr('type', 'radio').attr('name', 'account-item').attr('tabindex', 0).attr('id', acctID.toString()).val(acct).hide().appendTo(AcctList);

      var desc = $('<label/>')
        .addClass('form-check-label').addClass('dropdown-item')
        .text(acct)
        .attr('for', acctID.toString())
        .attr("onclick", "onAccountSelected()")
        .attr('name', 'account-labels')
        .attr('type', 'radio')
        .val(acctID)
        .appendTo(AcctList);

      acctID = acctID + 1;}
    );
  }

function onAccountSelected() {
  var accountID = -1;
  var dropDownItems = document.getElementsByName('account-item');
  var i = 0;
  while (i < dropDownItems.length) {
    if(dropDownItems[i].checked)
    {
      accountID = i;
      break;
    }
    i++;
  }
  if(accountID != -1)
  {
    console.log("account being selected is" + accountList[accountID]);
    accountSelected = accountList[accountID]
    isAccountSelected = true;
    $.ajax({
      url: "https://localhost:3000/accountSelection?selectedAccount=" + accountSelected
    });
    updateAccountSelectionStatus();
  }
}

function updateAccountSelectionStatus()
{
  $('#account-selection').toggle(false);
  $('#signature-content').toggle(true);
  buildSignatureList('#signatures-list', signatureList, accountSelected);
}

function getAccountIndices(accountName)
{
  var indices = []
  i = 0;

  signatureList.forEach(function(sig) {
    console.log(sig.substr(0, accountName.length))
    if (sig.substr(0, accountName.length) == accountName){
      indices.push(i);
    }
    i++;
  });
  return indices;
}

function getAccount()
  {
    return accountSelected;
  }

function getIsAccountSelected()
{
  return isAccountSelected;
}

function logOut()
{
  console.log("logging out " + accountSelected);
  $.ajax({
    url: "https://localhost:3000/logout?loggedOut=" + accountSelected
  });
  isAccountSelected = false;
  accountSelected = "";
  var taskpaneElements = document.querySelectorAll(".signature-html");
  console.log(taskpaneElements);
  for(var i = 0; i < taskpaneElements.length; i++)
  {
    taskpaneElements[i].remove();
  }
  $('#account-selection').toggle(true);
  $('#signature-content').toggle(false);

}