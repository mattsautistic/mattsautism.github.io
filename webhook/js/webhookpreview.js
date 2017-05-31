// Calculate width of text from DOM element or string. By Phil Freo <http://philfreo.com>
$.fn.textWidth = function(text, font) {
    if (!$.fn.textWidth.fakeEl) $.fn.textWidth.fakeEl = $('<span>').hide().appendTo(document.body);
    $.fn.textWidth.fakeEl.text(text || this.val() || this.text()).css('font', font || this.css('font'));
    return $.fn.textWidth.fakeEl.width();
};

var Webhookpreview = {
	PreviewVM: {
		previewURL: ko.observable($('#url').val()),
		previewUsername: ko.observable($('#name').val()),
		previewMessage: ko.observable($('#content').val()),
		previewAvatar: ko.observable($('#avatar').val()),
		previewAuthorName: ko.observable($('#author_name').val()),
		previewAuthorAvatar: ko.observable($('#author_icon').val()),
		previewTitle: ko.observable($('#embed_title').val()),
		previewEmbedText: ko.observable($('#embed_content').val()),
		previewEmbedColor: ko.observable($('#color').val()),
		timestampStr: ko.observable(new Date().toString("h:mm tt"))
	},
	DetermineEmbedWidth: function() {
		var biggesttextlength = 0;
		var embedTexts = 	[$('#author_name').textWidth() + 60,
							 $('#embed_title').textWidth() + 20,
							 $('#embed_content').textWidth() + 20];

		for (var i = 0; i < embedTexts.length; i++) {
			if (embedTexts[i] > biggesttextlength) {
				biggesttextlength = embedTexts[i];
			}
		}

		if (biggesttextlength >= $('.embedPreviewContainer').width() + 20) {
			return;
		}
		else {
			$('.embedPreviewBody').first().css('width', (biggesttextlength).toString() + 'px');
		}
	}
}



$('.input').on('propertychange input', function() {
	Webhookpreview.PreviewVM.timestampStr(new Date().toString("h:mm tt"));
});

$('.embed').on('propertychange input', function() {
	var exit = false;
	$('.embed').each(function(i, elem) {
		if ($(elem).val().length != 0) {
			$('.embedPreviewContainer').css('display', 'flex');
			exit = true;
			return;
		}
	});

	if (exit) { return; }
	$('.embedPreviewContainer').css('display', 'none');
});

$('#url').on('propertychange input', function() {
	Webhookpreview.PreviewVM.previewURL($('#url').val());
});

$('#name').on('propertychange input', function() {
	Webhookpreview.PreviewVM.previewUsername($('#name').val());
});

$('#content').on('propertychange input', function() {
	Webhookpreview.PreviewVM.previewMessage($('#content').val());
});

$('#avatar').on('propertychange input', function() {
	Webhookpreview.PreviewVM.previewAvatar($('#avatar').val());
	$('.previewAvatar').css('background-image', 'url(' + $('#avatar').val() + ')');
});

$('#author_name').on('propertychange input', function() {
	Webhookpreview.PreviewVM.previewAuthorName($('#author_name').val());
	Webhookpreview.DetermineEmbedWidth();
});

$('#author_icon').on('propertychange input', function() {
	Webhookpreview.PreviewVM.previewAuthorAvatar($('#author_icon').val());
	$('.embedAuthorAvatar').css('background-image', 'url(' + $('#author_icon').val() + ')');
});

$('#embed_title').on('propertychange input', function() {
	Webhookpreview.PreviewVM.previewTitle($('#embed_title').val());
	Webhookpreview.DetermineEmbedWidth();
});

$('#embed_content').on('propertychange input', function() {
	Webhookpreview.PreviewVM.previewEmbedText($('#embed_content').val());
	Webhookpreview.DetermineEmbedWidth();
});

$('#color').on('propertychange input', function() {
	Webhookpreview.PreviewVM.previewEmbedColor($('#color').val());
	$('.embedPreviewColor').css('background-color', $('#color').val());
});

ko.applyBindings(Webhookpreview.PreviewVM);