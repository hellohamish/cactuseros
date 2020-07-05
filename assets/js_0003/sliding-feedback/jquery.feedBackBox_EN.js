/*
	Copyright (c) 2013
	Willmer, Jens (http://jwillmer.de)

	Permission is hereby granted, free of charge, to any person obtaining
	a copy of this software and associated documentation files (the
	"Software"), to deal in the Software without restriction, including
	without limitation the rights to use, copy, modify, merge, publish,
	distribute, sublicense, and/or sell copies of the Software, and to
	permit persons to whom the Software is furnished to do so, subject to
	the following conditions:

	The above copyright notice and this permission notice shall be
	included in all copies or substantial portions of the Software.

	THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
	EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
	NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
	LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
	OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
	WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.


	feedBackBox: A small feedback box realized as jQuery Plugin.
	@author: Willmer, Jens
	@url: https://github.com/jwillmer/feedBackBox
	@documentation: https://github.com/jwillmer/feedBackBox/wiki
	@version: 0.0.1
*/
; (function ($) {
    $.fn.extend({
        feedBackBox: function (options) {

            // default options
            //titleMessage: 'Tienes alguna idea que te gustaría ver en Cactuseros',
            this.defaultOptions = {
                title: 'Contact',
                titleMessage: 'Cactuseros feedback and support',
                userName: '',
                isUsernameEnabled: false,
                message: 'For example, ',
                ajaxUrl: '/FrontController.php?comando=EnviarFeedback',
                successMessage: 'Thankyou for your feedback.',
                errorMessage: 'Error sending feedback.'
            };

            var settings = $.extend(true, {}, this.defaultOptions, options);

            return this.each(function () {
                var $this = $(this);
                var thisSettings = $.extend({}, settings);

                var diableUsername;
                if (!thisSettings.isUsernameEnabled) {
                    diableUsername = 'disabled="disabled"';
                }

                // add feedback box
                //+ '</div><div id="fpi_submit_message"><label for="message">Mensaje</label><textarea placeholder="Por ejemplo: me gustaría poder registrar y/o programar mis riegos en cactuseros y recibir recordatorios, etc." name="message"></textarea></div>'
                $this.html('<form><div id="fpi_feedback"><div id="fpi_title" class="rotate"><h2>'
                    + thisSettings.title
                    + '</h2></div><div id="fpi_content"><div id="fpi_header_message">'
                    + thisSettings.titleMessage
                    + '</div><div id="fpi_submit_message"><label for="message">Message</label><textarea placeholder="Please enter the details of your comment or support query" name="message"></textarea></div>'
                    + '<div id="fpi_submit_email"><label for="email">Email</label><textarea placeholder="If you would like a response enter a valid email address." name="email"></textarea></div>'
                    + '<div id="fpi_submit_loading"></div><div id="fpi_submit_submit"><input type="submit" value="Save">'
					          + '</div></form><div id="fpi_ajax_message"><h2></h2></div></div></div>');


                $('#fpi_submit_message textarea').change(function () {
                    if ($(this).val() != '') {
                        $(this).removeClass('error');
                    }
                });

                // submit action
                $this.find('form').submit(function () {

                    console.log("A");
                    // validate input fields
                    var haveErrors = false;
                    if ($('#fpi_submit_message textarea').val() == '') {
                        haveErrors = true;
                        $('#fpi_submit_message textarea').addClass('error');
                    }


                    console.log("B");

                    // send ajax call
                    if (!haveErrors) {
                        console.log("C");
                        // serialize all input fields
                        var disabled = $(this).find(':input:disabled').removeAttr('disabled');
                        var serialized = $(this).serialize();
                        disabled.attr('disabled', 'disabled');

                        // disable submit button
                        $('#fpi_submit_submit input').attr('disabled', 'disabled');

                        $.ajax({
                            type: 'POST',
                            dataType: 'json',
                            url: thisSettings.ajaxUrl,
                            data: serialized,
                            beforeSend: function () {
                                $('#fpi_submit_loading').show();
                            },
                            error: function (data) {
                                $('#fpi_content form').hide();
                                $('#fpi_content #fpi_ajax_message h2').html(thisSettings.errorMessage);
                            },
                            success: function () {
                                alert("Thanks, your message has been sent");
                                $("#feedback").hide();
                            }
                        });
                    }
                    console.log("D");
                    return false;
                });

                // open and close animation
                var isOpen = false;
                $('#fpi_title').click(function () {
                    if (isOpen) {
                        $('#fpi_feedback').animate({ "width": "+=5px" }, "fast")
                        .animate({ "width": "55px" }, "slow")
                        .animate({ "width": "60px" }, "fast");
                        isOpen = !isOpen;
                    } else {
                        $('#fpi_feedback').animate({ "width": "-=5px" }, "fast")
                        .animate({ "width": "365px" }, "slow")
                        .animate({ "width": "360px" }, "fast");

                        // reset properties
                        $('#fpi_submit_loading').hide();
                        $('#fpi_content form').show()
                        $('#fpi_content form .error').removeClass("error");
                        $('#fpi_submit_submit input').removeAttr('disabled');
                        isOpen = !isOpen;
                    }
                });

            });
        }
    });
})(jQuery);
