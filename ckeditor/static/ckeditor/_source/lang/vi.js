﻿/*
Copyright (c) 2003-2010, CKSource - Frederico Knabben. All rights reserved.
For licensing, see LICENSE.html or http://ckeditor.com/license
*/

/**
 * @fileOverview Defines the {@link CKEDITOR.lang} object, for the
 * Vietnamese language.
 */

/**#@+
   @type String
   @example
*/

/**
 * Constains the dictionary of language entries.
 * @namespace
 */
CKEDITOR.lang['vi'] =
{
	/**
	 * The language reading direction. Possible values are "rtl" for
	 * Right-To-Left languages (like Arabic) and "ltr" for Left-To-Right
	 * languages (like English).
	 * @default 'ltr'
	 */
	dir : 'ltr',

	/*
	 * Screenreader titles. Please note that screenreaders are not always capable
	 * of reading non-English words. So be careful while translating it.
	 */
	editorTitle : 'Rich text editor, %1, press ALT 0 for help.', // MISSING

	// ARIA descriptions.
	toolbar	: 'Toolbar', // MISSING
	editor	: 'Rich Text Editor', // MISSING

	// Toolbar buttons without dialogs.
	source			: 'Mã HTML',
	newPage			: 'Trang mới',
	save			: 'Lưu',
	preview			: 'Xem trước',
	cut				: 'Cắt',
	copy			: 'Sao chép',
	paste			: 'Dán',
	print			: 'In',
	underline		: 'Gạch chân',
	bold			: 'Đậm',
	italic			: 'Nghiêng',
	selectAll		: 'Chọn Tất cả',
	removeFormat	: 'Xoá Định dạng',
	strike			: 'Gạch xuyên ngang',
	subscript		: 'Chỉ số dưới',
	superscript		: 'Chỉ số trên',
	horizontalrule	: 'Chèn Đường phân cách ngang',
	pagebreak		: 'Chèn Ngắt trang',
	unlink			: 'Xoá Liên kết',
	undo			: 'Khôi phục thao tác',
	redo			: 'Làm lại thao tác',

	// Common messages and labels.
	common :
	{
		browseServer	: 'Duyệt trên máy chủ',
		url				: 'URL',
		protocol		: 'Giao thức',
		upload			: 'Tải lên',
		uploadSubmit	: 'Tải lên Máy chủ',
		image			: 'Hình ảnh',
		flash			: 'Flash',
		form			: 'Biểu mẫu',
		checkbox		: 'Nút kiểm',
		radio			: 'Nút chọn',
		textField		: 'Trường văn bản',
		textarea		: 'Vùng văn bản',
		hiddenField		: 'Trường ẩn',
		button			: 'Nút',
		select			: 'Ô chọn',
		imageButton		: 'Nút hình ảnh',
		notSet			: '<không thiết lập>',
		id				: 'Định danh',
		name			: 'Tên',
		langDir			: 'Đường dẫn Ngôn ngữ',
		langDirLtr		: 'Trái sang Phải (LTR)',
		langDirRtl		: 'Phải sang Trái (RTL)',
		langCode		: 'Mã Ngôn ngữ',
		longDescr		: 'Mô tả URL',
		cssClass		: 'Lớp Stylesheet',
		advisoryTitle	: 'Advisory Title',
		cssStyle		: 'Mẫu',
		ok				: 'Đồng ý',
		cancel			: 'Bỏ qua',
		close			: 'Close', // MISSING
		preview			: 'Preview', // MISSING
		generalTab		: 'Chung',
		advancedTab		: 'Mở rộng',
		validateNumberFailed : 'Giá trị này không phải là số.',
		confirmNewPage	: 'Mọi thay đổi không được không được lưu lại của nội dung này sẽ bị mất. Bạn có chắc chắn muốn tải một trang mới?',
		confirmCancel	: 'Một vài tùy chọn đã bị thay đổi. Bạn có chắc chắn muốn đóng hộp thoại?',
		options			: 'Options', // MISSING
		target			: 'Target', // MISSING
		targetNew		: 'New Window (_blank)', // MISSING
		targetTop		: 'Topmost Window (_top)', // MISSING
		targetSelf		: 'Same Window (_self)', // MISSING
		targetParent	: 'Parent Window (_parent)', // MISSING

		// Put the voice-only part of the label in the span.
		unavailable		: '%1<span class="cke_accessibility">, không có</span>'
	},

	// Special char dialog.
	specialChar		:
	{
		toolbar		: 'Chèn Ký tự đặc biệt',
		title		: 'Hãy chọn Ký tự đặc biệt'
	},

	// Link dialog.
	link :
	{
		toolbar		: 'Chèn/Sửa Liên kết',
		menu		: 'Sửa Liên kết',
		title		: 'Liên kết',
		info		: 'Thông tin Liên kết',
		target		: 'Đích',
		upload		: 'Tải lên',
		advanced	: 'Mở rộng',
		type		: 'Kiểu Liên kết',
		toUrl		: 'URL', // MISSING
		toAnchor	: 'Neo trong trang này',
		toEmail		: 'Thư điện tử',
		targetFrame		: '<khung>',
		targetPopup		: '<cửa sổ popup>',
		targetFrameName	: 'Tên Khung đích',
		targetPopupName	: 'Tên Cửa sổ Popup',
		popupFeatures	: 'Đặc điểm của Cửa sổ Popup',
		popupResizable	: 'Có thể thay đổi kích cỡ',
		popupStatusBar	: 'Thanh trạng thái',
		popupLocationBar: 'Thanh vị trí',
		popupToolbar	: 'Thanh công cụ',
		popupMenuBar	: 'Thanh Menu',
		popupFullScreen	: 'Toàn màn hình (IE)',
		popupScrollBars	: 'Thanh cuộn',
		popupDependent	: 'Phụ thuộc (Netscape)',
		popupWidth		: 'Rộng',
		popupLeft		: 'Vị trí Trái',
		popupHeight		: 'Cao',
		popupTop		: 'Vị trí Trên',
		id				: 'Định danh',
		langDir			: 'Đường dẫn Ngôn ngữ',
		langDirLTR		: 'Trái sang Phải (LTR)',
		langDirRTL		: 'Phải sang Trái (RTL)',
		acccessKey		: 'Phím Hỗ trợ truy cập',
		name			: 'Tên',
		langCode		: 'Đường dẫn Ngôn ngữ',
		tabIndex		: 'Chỉ số của Tab',
		advisoryTitle	: 'Advisory Title',
		advisoryContentType	: 'Advisory Content Type',
		cssClasses		: 'Lớp Stylesheet',
		charset			: 'Bảng mã của tài nguyên được liên kết đến',
		styles			: 'Mẫu',
		selectAnchor	: 'Chọn một Neo',
		anchorName		: 'Theo Tên Neo',
		anchorId		: 'Theo Định danh Thành phần',
		emailAddress	: 'Thư điện tử',
		emailSubject	: 'Tiêu đề Thông điệp',
		emailBody		: 'Nội dung Thông điệp',
		noAnchors		: '(Không có Neo nào trong tài liệu)',
		noUrl			: 'Hãy đưa vào Liên kết URL',
		noEmail			: 'Hãy đưa vào địa chỉ thư điện tử'
	},

	// Anchor dialog
	anchor :
	{
		toolbar		: 'Chèn/Sửa Neo',
		menu		: 'Thuộc tính Neo',
		title		: 'Thuộc tính Neo',
		name		: 'Tên của Neo',
		errorName	: 'Hãy nhập vào tên của Neo'
	},

	// Find And Replace Dialog
	findAndReplace :
	{
		title				: 'Tìm kiếm và Thay Thế',
		find				: 'Tìm kiếm',
		replace				: 'Thay thế',
		findWhat			: 'Tìm chuỗi:',
		replaceWith			: 'Thay bằng:',
		notFoundMsg			: 'Không tìm thấy chuỗi cần tìm.',
		matchCase			: 'Phân biệt chữ hoa/thường',
		matchWord			: 'Giống toàn bộ từ',
		matchCyclic			: 'Giống một phần',
		replaceAll			: 'Thay thế Tất cả',
		replaceSuccessMsg	: '%1 vị trí đã được thay thế.'
	},

	// Table Dialog
	table :
	{
		toolbar		: 'Bảng',
		title		: 'Thuộc tính bảng',
		menu		: 'Thuộc tính bảng',
		deleteTable	: 'Xóa Bảng',
		rows		: 'Hàng',
		columns		: 'Cột',
		border		: 'Cỡ Đường viền',
		align		: 'Canh lề',
		alignLeft	: 'Trái',
		alignCenter	: 'Giữa',
		alignRight	: 'Phải',
		width		: 'Rộng',
		widthPx		: 'điểm (px)',
		widthPc		: '%',
		widthUnit	: 'width unit', // MISSING
		height		: 'Cao',
		cellSpace	: 'Khoảng cách Ô',
		cellPad		: 'Đệm Ô',
		caption		: 'Đầu đề',
		summary		: 'Tóm lược',
		headers		: 'Đầu đề',
		headersNone		: 'Không có',
		headersColumn	: 'Cột Đầu tiên',
		headersRow		: 'Hàng Đầu tiên',
		headersBoth		: 'Cả hai',
		invalidRows		: 'Số lượng hàng phải là một số lớn hơn 0.',
		invalidCols		: 'Số lượng cột phải là một số lớn hơn 0.',
		invalidBorder	: 'Kích cỡ của đường biên phải là một số nguyên.',
		invalidWidth	: 'Chiều rộng của Bảng phải là một số nguyên.',
		invalidHeight	: 'Chiều cao của Bảng phải là một số nguyên.',
		invalidCellSpacing	: 'Khoảng cách giữa các ô phải là một số nguyên.',
		invalidCellPadding	: 'Đệm giữa các ô phải là một số nguyên.',

		cell :
		{
			menu			: 'Ô',
			insertBefore	: 'Chèn Ô Phía trước',
			insertAfter		: 'Chèn Ô Phía sau',
			deleteCell		: 'Xoá Ô',
			merge			: 'Kết hợp Ô',
			mergeRight		: 'Kết hợp Sang phải',
			mergeDown		: 'Kết hợp Xuống dưới',
			splitHorizontal	: 'Tách ngang Ô',
			splitVertical	: 'Tách dọc Ô',
			title			: 'Thuộc tính của Ô',
			cellType		: 'Kiểu của Ô',
			rowSpan			: 'Kết hợp hàng',
			colSpan			: 'Kết hợp cột',
			wordWrap		: 'Word Wrap',
			hAlign			: 'Canh lề ngang',
			vAlign			: 'Canh lề dọc',
			alignTop		: 'Trên cùng',
			alignMiddle		: 'Chính giữa',
			alignBottom		: 'Dưới cùng',
			alignBaseline	: 'Đường cơ sở',
			bgColor			: 'Màu nền',
			borderColor		: 'Màu viền',
			data			: 'Dữ liệu',
			header			: 'Đầu đề',
			yes				: 'Có',
			no				: 'Không',
			invalidWidth	: 'Chiều rộng của Ô phải là một số nguyên.',
			invalidHeight	: 'Chiều cao của Ô phải là một số nguyên.',
			invalidRowSpan	: 'Số hàng kết hợp phải là một số nguyên.',
			invalidColSpan	: 'Số cột kết hợp phải là một số nguyên.',
			chooseColor		: 'Choose' // MISSING
		},

		row :
		{
			menu			: 'Hàng',
			insertBefore	: 'Chèn Hàng Phía trước',
			insertAfter		: 'Chèn Hàng Phía sau',
			deleteRow		: 'Xoá Hàng'
		},

		column :
		{
			menu			: 'Cột',
			insertBefore	: 'Chèn Cột Phía trước',
			insertAfter		: 'Chèn Cột Phía sau',
			deleteColumn	: 'Xoá Cột'
		}
	},

	// Button Dialog.
	button :
	{
		title		: 'Thuộc tính Nút',
		text		: 'Chuỗi hiển thị (Giá trị)',
		type		: 'Kiểu',
		typeBtn		: 'Nút Bấm',
		typeSbm		: 'Nút Gửi',
		typeRst		: 'Nút Nhập lại'
	},

	// Checkbox and Radio Button Dialogs.
	checkboxAndRadio :
	{
		checkboxTitle : 'Thuộc tính Nút kiểm',
		radioTitle	: 'Thuộc tính Nút chọn',
		value		: 'Giá trị',
		selected	: 'Được chọn'
	},

	// Form Dialog.
	form :
	{
		title		: 'Thuộc tính Biểu mẫu',
		menu		: 'Thuộc tính Biểu mẫu',
		action		: 'Hành động',
		method		: 'Phương thức',
		encoding	: 'Bảng mã'
	},

	// Select Field Dialog.
	select :
	{
		title		: 'Thuộc tính Ô chọn',
		selectInfo	: 'Thông tin',
		opAvail		: 'Các tùy chọn có thể sử dụng',
		value		: 'Giá trị',
		size		: 'Kích cỡ',
		lines		: 'dòng',
		chkMulti	: 'Cho phép chọn nhiều',
		opText		: 'Văn bản',
		opValue		: 'Giá trị',
		btnAdd		: 'Thêm',
		btnModify	: 'Thay đổi',
		btnUp		: 'Lên',
		btnDown		: 'Xuống',
		btnSetValue : 'Giá trị được chọn',
		btnDelete	: 'Xoá'
	},

	// Textarea Dialog.
	textarea :
	{
		title		: 'Thuộc tính Vùng văn bản',
		cols		: 'Cột',
		rows		: 'Hàng'
	},

	// Text Field Dialog.
	textfield :
	{
		title		: 'Thuộc tính Trường văn bản',
		name		: 'Tên',
		value		: 'Giá trị',
		charWidth	: 'Rộng',
		maxChars	: 'Số Ký tự tối đa',
		type		: 'Kiểu',
		typeText	: 'Ký tự',
		typePass	: 'Mật khẩu'
	},

	// Hidden Field Dialog.
	hidden :
	{
		title	: 'Thuộc tính Trường ẩn',
		name	: 'Tên',
		value	: 'Giá trị'
	},

	// Image Dialog.
	image :
	{
		title		: 'Thuộc tính Hình ảnh',
		titleButton	: 'Thuộc tính Nút hình ảnh',
		menu		: 'Thuộc tính Hình ảnh',
		infoTab		: 'Thông tin Hình ảnh',
		btnUpload	: 'Tải lên Máy chủ',
		upload		: 'Tải lên',
		alt			: 'Chú thích Hình ảnh',
		width		: 'Rộng',
		height		: 'Cao',
		lockRatio	: 'Giữ nguyên tỷ lệ',
		unlockRatio	: 'Unlock Ratio', // MISSING
		resetSize	: 'Kích thước gốc',
		border		: 'Đường viền',
		hSpace		: 'HSpace',
		vSpace		: 'VSpace',
		align		: 'Vị trí',
		alignLeft	: 'Trái',
		alignRight	: 'Phải',
		alertUrl	: 'Hãy đưa vào URL của hình ảnh',
		linkTab		: 'Liên kết',
		button2Img	: 'Bạn có muốn chuyển nút bấm bằng hình ảnh được chọn thành hình ảnh?',
		img2Button	: 'Bạn có muốn chuyển đổi hình ảnh được chọn thành nút bấm bằng hình ảnh?',
		urlMissing	: 'Image source URL is missing.', // MISSING
		validateWidth	: 'Width must be a whole number.', // MISSING
		validateHeight	: 'Height must be a whole number.', // MISSING
		validateBorder	: 'Border must be a whole number.', // MISSING
		validateHSpace	: 'HSpace must be a whole number.', // MISSING
		validateVSpace	: 'VSpace must be a whole number.' // MISSING
	},

	// Flash Dialog
	flash :
	{
		properties		: 'Thuộc tính Flash',
		propertiesTab	: 'Thuộc tính',
		title			: 'Thuộc tính Flash',
		chkPlay			: 'Tự động chạy',
		chkLoop			: 'Lặp',
		chkMenu			: 'Cho phép bật Menu của Flash',
		chkFull			: 'Cho phép Toàn màn hình',
 		scale			: 'Tỷ lệ',
		scaleAll		: 'Hiển thị tất cả',
		scaleNoBorder	: 'Không đường viền',
		scaleFit		: 'Vừa vặn',
		access			: 'Truy cập Mã',
		accessAlways	: 'Luôn luôn',
		accessSameDomain: 'Cùng tên miền',
		accessNever		: 'Không bao giờ',
		align			: 'Vị trí',
		alignLeft		: 'Trái',
		alignAbsBottom	: 'Dưới tuyệt đối',
		alignAbsMiddle	: 'Giữa tuyệt đối',
		alignBaseline	: 'Đường cơ sở',
		alignBottom		: 'Dưới',
		alignMiddle		: 'Giữa',
		alignRight		: 'Phải',
		alignTextTop	: 'Phía trên chữ',
		alignTop		: 'Trên',
		quality			: 'Chất lượng',
		qualityBest		: 'TỐt nhất',
		qualityHigh		: 'Cao',
		qualityAutoHigh	: 'Cao Tự động',
		qualityMedium	: 'Trung bình',
		qualityAutoLow	: 'Thấp Tự động',
		qualityLow		: 'Thấp',
		windowModeWindow: 'Cửa sổ',
		windowModeOpaque: 'Mờ đục',
		windowModeTransparent : 'Trong suốt',
		windowMode		: 'Chế độ Cửa sổ',
		flashvars		: 'Các biến số dành cho Flash',
		bgcolor			: 'Màu nền',
		width			: 'Rộng',
		height			: 'Cao',
		hSpace			: 'HSpace',
		vSpace			: 'VSpace',
		validateSrc		: 'Hãy đưa vào Liên kết URL',
		validateWidth	: 'Chiều rộng phải là số nguyên.',
		validateHeight	: 'Chiều cao phải là số nguyên.',
		validateHSpace	: 'HSpace phải là số nguyên.',
		validateVSpace	: 'VSpace phải là số nguyên.'
	},

	// Speller Pages Dialog
	spellCheck :
	{
		toolbar			: 'Kiểm tra Chính tả',
		title			: 'Kiểm tra Chính tả',
		notAvailable	: 'Xin lỗi, dịch vụ này hiện tại không có.',
		errorLoading	: 'Lỗi khi đang nạp dịch vụ ứng dụng: %s.',
		notInDic		: 'Không có trong từ điển',
		changeTo		: 'Chuyển thành',
		btnIgnore		: 'Bỏ qua',
		btnIgnoreAll	: 'Bỏ qua Tất cả',
		btnReplace		: 'Thay thế',
		btnReplaceAll	: 'Thay thế Tất cả',
		btnUndo			: 'Phục hồi lại',
		noSuggestions	: '- Không đưa ra gợi ý về từ -',
		progress		: 'Đang tiến hành kiểm tra chính tả...',
		noMispell		: 'Hoàn tất kiểm tra chính tả: Không có lỗi chính tả',
		noChanges		: 'Hoàn tất kiểm tra chính tả: Không có từ nào được thay đổi',
		oneChange		: 'Hoàn tất kiểm tra chính tả: Một từ đã được thay đổi',
		manyChanges		: 'Hoàn tất kiểm tra chính tả: %1 từ đã được thay đổi',
		ieSpellDownload	: 'Chức năng kiểm tra chính tả chưa được cài đặt. Bạn có muốn tải về ngay bây giờ?'
	},

	smiley :
	{
		toolbar	: 'Hình biểu lộ cảm xúc (mặt cười)',
		title	: 'Chèn Hình biểu lộ cảm xúc (mặt cười)'
	},

	elementsPath :
	{
		eleLabel : 'Elements path', // MISSING
		eleTitle : '%1 thành phần'
	},

	numberedlist	: 'Danh sách có thứ tự',
	bulletedlist	: 'Danh sách không thứ tự',
	indent			: 'Dịch vào trong',
	outdent			: 'Dịch ra ngoài',

	justify :
	{
		left	: 'Canh trái',
		center	: 'Canh giữa',
		right	: 'Canh phải',
		block	: 'Canh đều'
	},

	blockquote : 'Khối Trích dẫn',

	clipboard :
	{
		title		: 'Dán',
		cutError	: 'Các thiết lập bảo mật của trình duyệt không cho phép trình biên tập tự động thực thi lệnh cắt. Hãy sử dụng bàn phím cho lệnh này (Ctrl+X).',
		copyError	: 'Các thiết lập bảo mật của trình duyệt không cho phép trình biên tập tự động thực thi lệnh sao chép. Hãy sử dụng bàn phím cho lệnh này (Ctrl+C).',
		pasteMsg	: 'Hãy dán nội dung vào trong khung bên dưới, sử dụng tổ hợp phím (<STRONG>Ctrl+V</STRONG>) và nhấn vào nút <STRONG>Đồng ý</STRONG>.',
		securityMsg	: 'Do thiết lập bảo mật của trình duyệt nên trình biên tập không thể truy cập trực tiếp vào nội dung đã sao chép. Bạn cần phải dán lại nội dung vào cửa sổ này.',
		pasteArea	: 'Paste Area' // MISSING
	},

	pastefromword :
	{
		confirmCleanup	: 'Văn bản bạn muốn dán có kèm định dạng của Word. Bạn có muốn loại bỏ định dạng Word trước khi dán?',
		toolbar			: 'Dán với định dạng Word',
		title			: 'Dán với định dạng Word',
		error			: 'It was not possible to clean up the pasted data due to an internal error' // MISSING
	},

	pasteText :
	{
		button	: 'Dán theo định dạng văn bản thuần',
		title	: 'Dán theo định dạng văn bản thuần'
	},

	templates :
	{
		button			: 'Mẫu dựng sẵn',
		title			: 'Nội dung Mẫu dựng sẵn',
		insertOption	: 'Thay thế nội dung hiện tại',
		selectPromptMsg	: 'Hãy chọn Mẫu dựng sẵn để mở trong trình biên tập<br>(nội dung hiện tại sẽ bị mất):',
		emptyListMsg	: '(Không có Mẫu dựng sẵn nào được định nghĩa)'
	},

	showBlocks : 'Hiển thị các Khối',

	stylesCombo :
	{
		label		: 'Kiểu',
		panelTitle	: 'Formatting Styles', // MISSING
		panelTitle1	: 'Kiểu Khối',
		panelTitle2	: 'Kiểu Trực tiếp',
		panelTitle3	: 'Kiểu Đối tượng'
	},

	format :
	{
		label		: 'Định dạng',
		panelTitle	: 'Định dạng',

		tag_p		: 'Normal',
		tag_pre		: 'Formatted',
		tag_address	: 'Address',
		tag_h1		: 'Heading 1',
		tag_h2		: 'Heading 2',
		tag_h3		: 'Heading 3',
		tag_h4		: 'Heading 4',
		tag_h5		: 'Heading 5',
		tag_h6		: 'Heading 6',
		tag_div		: 'Normal (DIV)'
	},

	div :
	{
		title				: 'Create Div Container', // MISSING
		toolbar				: 'Create Div Container', // MISSING
		cssClassInputLabel	: 'Stylesheet Classes', // MISSING
		styleSelectLabel	: 'Style', // MISSING
		IdInputLabel		: 'Id', // MISSING
		languageCodeInputLabel	: ' Language Code', // MISSING
		inlineStyleInputLabel	: 'Inline Style', // MISSING
		advisoryTitleInputLabel	: 'Advisory Title', // MISSING
		langDirLabel		: 'Language Direction', // MISSING
		langDirLTRLabel		: 'Left to Right (LTR)', // MISSING
		langDirRTLLabel		: 'Right to Left (RTL)', // MISSING
		edit				: 'Edit Div', // MISSING
		remove				: 'Remove Div' // MISSING
  	},

	font :
	{
		label		: 'Phông',
		voiceLabel	: 'Phông',
		panelTitle	: 'Phông'
	},

	fontSize :
	{
		label		: 'Cỡ chữ',
		voiceLabel	: 'Kích cỡ phông',
		panelTitle	: 'Cỡ chữ'
	},

	colorButton :
	{
		textColorTitle	: 'Màu chữ',
		bgColorTitle	: 'Màu nền',
		panelTitle		: 'Colors', // MISSING
		auto			: 'Tự động',
		more			: 'Màu khác...'
	},

	colors :
	{
		'000' : 'Black', // MISSING
		'800000' : 'Maroon', // MISSING
		'8B4513' : 'Saddle Brown', // MISSING
		'2F4F4F' : 'Dark Slate Gray', // MISSING
		'008080' : 'Teal', // MISSING
		'000080' : 'Navy', // MISSING
		'4B0082' : 'Indigo', // MISSING
		'696969' : 'Dim Gray', // MISSING
		'B22222' : 'Fire Brick', // MISSING
		'A52A2A' : 'Brown', // MISSING
		'DAA520' : 'Golden Rod', // MISSING
		'006400' : 'Dark Green', // MISSING
		'40E0D0' : 'Turquoise', // MISSING
		'0000CD' : 'Medium Blue', // MISSING
		'800080' : 'Purple', // MISSING
		'808080' : 'Gray', // MISSING
		'F00' : 'Red', // MISSING
		'FF8C00' : 'Dark Orange', // MISSING
		'FFD700' : 'Gold', // MISSING
		'008000' : 'Green', // MISSING
		'0FF' : 'Cyan', // MISSING
		'00F' : 'Blue', // MISSING
		'EE82EE' : 'Violet', // MISSING
		'A9A9A9' : 'Dark Gray', // MISSING
		'FFA07A' : 'Light Salmon', // MISSING
		'FFA500' : 'Orange', // MISSING
		'FFFF00' : 'Yellow', // MISSING
		'00FF00' : 'Lime', // MISSING
		'AFEEEE' : 'Pale Turquoise', // MISSING
		'ADD8E6' : 'Light Blue', // MISSING
		'DDA0DD' : 'Plum', // MISSING
		'D3D3D3' : 'Light Grey', // MISSING
		'FFF0F5' : 'Lavender Blush', // MISSING
		'FAEBD7' : 'Antique White', // MISSING
		'FFFFE0' : 'Light Yellow', // MISSING
		'F0FFF0' : 'Honeydew', // MISSING
		'F0FFFF' : 'Azure', // MISSING
		'F0F8FF' : 'Alice Blue', // MISSING
		'E6E6FA' : 'Lavender', // MISSING
		'FFF' : 'White' // MISSING
	},

	scayt :
	{
		title			: 'Kiểm tra chính tả ngay khi gõ chữ (SCAYT)',
		enable			: 'Bật SCAYT',
		disable			: 'Tắt SCAYT',
		about			: 'Thông tin về SCAYT',
		toggle			: 'Bật tắt SCAYT',
		options			: 'Tùy chọn',
		langs			: 'Ngôn ngữ',
		moreSuggestions	: 'Đề xuất thêm',
		ignore			: 'Bỏ qua',
		ignoreAll		: 'Bỏ qua Tất cả',
		addWord			: 'Thêm Từ',
		emptyDic		: 'Tên của từ điển không được để trống.',
		optionsTab		: 'Tùy chọn',
		languagesTab	: 'Ngôn ngữ',
		dictionariesTab	: 'Từ điển',
		aboutTab		: 'Thông tin'
	},

	about :
	{
		title		: 'Thông tin về CKEditor',
		dlgTitle	: 'Thông tin về CKEditor',
		moreInfo	: 'Vui lòng ghé thăm trang web của chúng tôi để có thông tin về giấy phép:',
		copy		: 'Bản quyền &copy; $1. Giữ toàn quyền.'
	},

	maximize : 'Phóng to tối đa',
	minimize : 'Minimize', // MISSING

	fakeobjects :
	{
		anchor	: 'Neo',
		flash	: 'Hoạt họa Flash',
		div		: 'Ngắt Trang',
		unknown	: 'Đối tượng không rõ ràng'
	},

	resize : 'Kéo rê để thay đổi kích cỡ',

	colordialog :
	{
		title		: 'Select color', // MISSING
		highlight	: 'Highlight', // MISSING
		selected	: 'Selected', // MISSING
		clear		: 'Clear' // MISSING
	},

	toolbarCollapse	: 'Collapse Toolbar', // MISSING
	toolbarExpand	: 'Expand Toolbar' // MISSING
};
