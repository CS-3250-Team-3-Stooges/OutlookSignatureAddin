var isAccountSelected = true;
var accountSelected = "Philip";
var signatureList;
var accounttList;

function buildAccountList(parent, acctList, signaturesForMe) {
    accountList = acctList;
    signatureList = signaturesForMe;
    var acctID = 0
    acctList.forEach(function(acct) {
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

    accountSelected = accountList[accountID]
    isAccountSelected = true;
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