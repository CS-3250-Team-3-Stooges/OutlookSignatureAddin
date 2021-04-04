
function getSignatures (endpoint) {
  var sigList;
    $.ajax({
        url: "https://localhost:3000/" + endpoint,
        type: "GET",
        success: function(result){
          sigList = result.split('\n');
          buildSignatureList('#signatures-list', sigList, onSignatureIsSelected)
          
        }

      }); 
  }
 
  function buildSignatureList(parent, sigList, clickFunc) {
    var sigID = 0
    sigList.forEach(function(sig) {
      var SigList = $('<div/>').appendTo(parent);
  
      var radioItem = $('<input>').addClass('ms-ListItem').addClass('is-selectable').val(sigID).attr('onclick', "onSignatureSelected()")
        .attr('type', 'radio').attr('name', 'signature-radio').attr('tabindex', 0).attr('id', 'radioButton').appendTo(SigList);
        console.log(radioItem.val());

      var desc = $('<span/>')
        .addClass('text-dark').addClass('rounded').addClass('signature-padding').addClass('is-selectable')
        .text(sig)
        .appendTo(SigList);
      sigID = sigID + 1;
    });
  }
  
  function onSignatureIsSelected(){
    $('#insert-signature').removeAttr('disabled');
    $(this).children('.ms-ListItem').addClass('is-selected').attr('checked', 'checked');
  }

  function buildFileList(files) {
  
    var fileList = '';
  
    for (var file in files) {
      if (files.hasOwnProperty(file)) {
        if (fileList.length > 0) {
          fileList = fileList + ', ';
        }
  
        fileList = fileList + files[file].filename + ' (' + files[file].language + ')';
      }
    }
  
    return fileList;
  }

  function getGist(gistId, callback) {
    var requestUrl = 'https://api.github.com/gists/' + gistId;
  
    $.ajax({
      url: requestUrl,
      dataType: 'json'
    }).done(function(gist){
      callback(gist);
    }).fail(function(error){
      callback(null, error);
    });
  }
  
  function buildBodyContent(gist, callback) {
    // Find the first non-truncated file in the gist
    // and use it.
    for (var filename in gist.files) {
      if (gist.files.hasOwnProperty(filename)) {
        var file = gist.files[filename];
        if (!file.truncated) {
          // We have a winner.
          switch (file.language) {
            case 'HTML':
              // Insert as-is.
              callback(file.content);
              break;
            case 'Markdown':
              // Convert Markdown to HTML.
              var converter = new showdown.Converter();
              var html = converter.makeHtml(file.content);
              callback(html);
              break;
            default:
              // Insert contents as a <code> block.
              var codeBlock = '<pre><code>';
              codeBlock = codeBlock + file.content;
              codeBlock = codeBlock + '</code></pre>';
              callback(codeBlock);
          }
          return;
        }
      }
    }
    callback(null, 'No suitable file found in the gist');
  }
