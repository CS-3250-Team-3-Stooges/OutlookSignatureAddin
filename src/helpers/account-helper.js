var isAccountSelected = false;
var accountSelected = "";
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
  console.log(accountSelected)
  buildSignatureList('#signatures-list', signatureList, accountSelected);
}