    /* Hide & Show answers */
    $('body').on('click', '.btn.reveal-solution', function (e) {
        e.preventDefault();
        $(this).parent('.question-body').find('.question-answer').fadeIn(100);
        $(this).parent('.question-body').find('.hide-solution').removeClass('d-none');
        $(this).parent('.question-body').find('.correct-hidden').addClass('correct-choice');
        $(this).addClass('d-none');
    });

    $('body').on('click', '.btn.hide-solution', function (e) {
        e.preventDefault();
        $(this).parent('.question-body').find('.question-answer').fadeOut(100);
        $(this).parent('.question-body').find('.reveal-solution').removeClass('d-none');
        $(this).parent('.question-body').find('.correct-hidden').removeClass('correct-choice');
        $(this).addClass('d-none');
    });

    function is_question_mcq(question_jquery_object){
        return question_jquery_object.find(".multi-choice-letter").length > 0;
    }

    function set_voting_configuration_by_question(question_jquery_object) {
        // Voted comments are only for MCQ questions, this function has nothing to do on other questions
        if (!is_question_mcq(question_jquery_object))
            return;

        let choice_limit = question_jquery_object.find(".correct-answer").text().trim().length;
        let choices_elements = question_jquery_object.find(".multi-choice-letter");

        let choice_letters = "";
        choices_elements.each(function() {
            choice_letters += $(this).text().trim()[0];
        });

        let question_id = question_jquery_object.find(".question-body").addBack('.question-body').data("id");
        // let discussion_object = getDiscussionObjectByQuestionId(question_id);

        // set_voted_comment_config(discussion_object, choice_letters, choice_limit);
    }

    /* Hide & Show comment */
    $('body').on('click', '.badge.reveal-comment', function (e) {
        e.preventDefault();
        $(this).parent('.comment-container').find('.comment-body').fadeIn(100);
        $(this).parent('.comment-container').find('.hide-comment').removeClass('d-none');
        $(this).addClass('d-none');
    });

    $('body').on('click', '.badge.hide-comment', function (e) {
        e.preventDefault();
        $(this).parent('.comment-container').find('.comment-body').fadeOut(100);
        $(this).parent('.comment-container').find('.reveal-comment').removeClass('d-none');
        $(this).addClass('d-none');
    });

	function togglePage(dirPath) {
		var dirSegment = window.location.pathname.split('/');
		var fileName = dirSegment[dirSegment.length - 1];
		if (dirSegment[dirSegment.length - 2] == "kr") {
			window.location.href = dirPath + fileName.replace('-KR.html', '.html');
		} else {
			window.location.href = dirPath + 'kr/' + fileName.replace('.html', '-KR.html');
		}
	}

    /* English & Korean toggle */
    $('body').on('click', '.badge.show-english', function (e) {
        e.preventDefault();
        $(this).parent('.exam-container').find('.discussion-list-header').fadeOut(0);
        $(this).parent('.exam-container').find('.discussion-list-header-en').fadeIn(0);
        $(this).parent('.exam-container').find('.discussion-header-container').fadeOut(0);
        $(this).parent('.exam-container').find('.discussion-header-container-en').fadeIn(0);
        $(this).parent('.exam-container').find('.comment-container').fadeOut(0);
        $(this).parent('.exam-container').find('.comment-container-en').fadeIn(0);
        $(this).parent('.exam-container').find('.show-korean').removeClass('d-none');
        $(this).addClass('d-none');
    });

    $('body').on('click', '.badge.show-korean', function (e) {
        e.preventDefault();
        $(this).parent('.exam-container').find('.discussion-list-header-en').fadeOut(0);
        $(this).parent('.exam-container').find('.discussion-list-header').fadeIn(0);
        $(this).parent('.exam-container').find('.discussion-header-container-en').fadeOut(0);
        $(this).parent('.exam-container').find('.discussion-header-container').fadeIn(0);
        $(this).parent('.exam-container').find('.comment-container-en').fadeOut(0);
        $(this).parent('.exam-container').find('.comment-container').fadeIn(0);
        $(this).parent('.exam-container').find('.show-english').removeClass('d-none');
        $(this).addClass('d-none');
    });
