﻿/*
Copyright (c) 2003-2010, CKSource - Frederico Knabben. All rights reserved.
For licensing, see LICENSE.html or http://ckeditor.com/license
*/

/**
 * @fileOverview Defines the {@link CKEDITOR.lang} object, for the
 * Russian language.
 */

/**#@+
   @type String
   @example
*/

/**
 * Constains the dictionary of language entries.
 * @namespace
 */
CKEDITOR.lang['ru'] =
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
	source			: 'Источник',
	newPage			: 'Новая страница',
	save			: 'Сохранить',
	preview			: 'Предварительный просмотр',
	cut				: 'Вырезать',
	copy			: 'Копировать',
	paste			: 'Вставить',
	print			: 'Печать',
	underline		: 'Подчеркнутый',
	bold			: 'Жирный',
	italic			: 'Курсив',
	selectAll		: 'Выделить все',
	removeFormat	: 'Убрать форматирование',
	strike			: 'Зачеркнутый',
	subscript		: 'Подстрочный индекс',
	superscript		: 'Надстрочный индекс',
	horizontalrule	: 'Вставить горизонтальную линию',
	pagebreak		: 'Вставить разрыв страницы',
	unlink			: 'Убрать ссылку',
	undo			: 'Отменить',
	redo			: 'Повторить',

	// Common messages and labels.
	common :
	{
		browseServer	: 'Просмотреть на сервере',
		url				: 'URL',
		protocol		: 'Протокол',
		upload			: 'Закачать',
		uploadSubmit	: 'Послать на сервер',
		image			: 'Изображение',
		flash			: 'Flash',
		form			: 'Форма',
		checkbox		: 'Флаговая кнопка',
		radio			: 'Кнопка выбора',
		textField		: 'Текстовое поле',
		textarea		: 'Текстовая область',
		hiddenField		: 'Скрытое поле',
		button			: 'Кнопка',
		select			: 'Список',
		imageButton		: 'Кнопка с изображением',
		notSet			: '<не определено>',
		id				: 'Идентификатор',
		name			: 'Имя',
		langDir			: 'Направление языка',
		langDirLtr		: 'Слева на право (LTR)',
		langDirRtl		: 'Справа на лево (RTL)',
		langCode		: 'Язык',
		longDescr		: 'Длинное описание URL',
		cssClass		: 'Класс CSS',
		advisoryTitle	: 'Заголовок',
		cssStyle		: 'Стиль CSS',
		ok				: 'ОК',
		cancel			: 'Отмена',
		close			: 'Close', // MISSING
		preview			: 'Preview', // MISSING
		generalTab		: 'Информация',
		advancedTab		: 'Расширенный',
		validateNumberFailed : 'Это значение не является числом.',
		confirmNewPage	: 'Все несохраненные изменения будут утеряны. Вы уверены, что хотите перейти на другую страницу?',
		confirmCancel	: 'Некоторые опции были изменены. Вы уверены, что хотите закрыть диалог?',
		options			: 'Options', // MISSING
		target			: 'Target', // MISSING
		targetNew		: 'New Window (_blank)', // MISSING
		targetTop		: 'Topmost Window (_top)', // MISSING
		targetSelf		: 'Same Window (_self)', // MISSING
		targetParent	: 'Parent Window (_parent)', // MISSING

		// Put the voice-only part of the label in the span.
		unavailable		: '%1<span class="cke_accessibility">, недоступно</span>'
	},

	// Special char dialog.
	specialChar		:
	{
		toolbar		: 'Вставить специальный символ',
		title		: 'Выберите специальный символ'
	},

	// Link dialog.
	link :
	{
		toolbar		: 'Вставить/Редактировать ссылку',
		menu		: 'Вставить ссылку',
		title		: 'Ссылка',
		info		: 'Информация ссылки',
		target		: 'Цель',
		upload		: 'Закачать',
		advanced	: 'Расширенный',
		type		: 'Тип ссылки',
		toUrl		: 'URL', // MISSING
		toAnchor	: 'Якорь на эту страницу',
		toEmail		: 'Эл. почта',
		targetFrame		: '<фрейм>',
		targetPopup		: '<всплывающее окно>',
		targetFrameName	: 'Имя целевого фрейма',
		targetPopupName	: 'Имя всплывающего окна',
		popupFeatures	: 'Свойства всплывающего окна',
		popupResizable	: 'Изменяемый размер',
		popupStatusBar	: 'Строка состояния',
		popupLocationBar: 'Панель локации',
		popupToolbar	: 'Панель инструментов',
		popupMenuBar	: 'Панель меню',
		popupFullScreen	: 'Полный экран (IE)',
		popupScrollBars	: 'Полосы прокрутки',
		popupDependent	: 'Зависимый (Netscape)',
		popupWidth		: 'Ширина',
		popupLeft		: 'Позиция слева',
		popupHeight		: 'Высота',
		popupTop		: 'Позиция сверху',
		id				: 'Id',
		langDir			: 'Направление языка',
		langDirLTR		: 'Слева направо (LTR)',
		langDirRTL		: 'Справа налево (RTL)',
		acccessKey		: 'Горячая клавиша',
		name			: 'Имя',
		langCode		: 'Код языка',
		tabIndex		: 'Последовательность перехода',
		advisoryTitle	: 'Заголовок',
		advisoryContentType	: 'Тип содержимого',
		cssClasses		: 'Класс CSS',
		charset			: 'Кодировка',
		styles			: 'Стиль CSS',
		selectAnchor	: 'Выберите якорь',
		anchorName		: 'По имени якоря',
		anchorId		: 'По идентификатору элемента',
		emailAddress	: 'Адрес эл. почты',
		emailSubject	: 'Заголовок сообщения',
		emailBody		: 'Тело сообщения',
		noAnchors		: '(Нет якорей доступных в этом документе)',
		noUrl			: 'Пожалуйста, введите URL ссылки',
		noEmail			: 'Пожалуйста, введите адрес эл. почты'
	},

	// Anchor dialog
	anchor :
	{
		toolbar		: 'Вставить/Редактировать якорь',
		menu		: 'Свойства якоря',
		title		: 'Свойства якоря',
		name		: 'Имя якоря',
		errorName	: 'Пожалуйста, введите имя якоря'
	},

	// Find And Replace Dialog
	findAndReplace :
	{
		title				: 'Найти и заменить',
		find				: 'Найти',
		replace				: 'Заменить',
		findWhat			: 'Найти:',
		replaceWith			: 'Заменить на:',
		notFoundMsg			: 'Указанный текст не найден.',
		matchCase			: 'Учитывать регистр',
		matchWord			: 'Только слово целиком',
		matchCyclic			: 'Начинать с начала после достижения конца',
		replaceAll			: 'Заменить все',
		replaceSuccessMsg	: '%1 совпадение(й) заменено.'
	},

	// Table Dialog
	table :
	{
		toolbar		: 'Таблица',
		title		: 'Свойства таблицы',
		menu		: 'Свойства таблицы',
		deleteTable	: 'Удалить таблицу',
		rows		: 'Строки',
		columns		: 'Колонки',
		border		: 'Размер бордюра',
		align		: 'Выравнивание',
		alignLeft	: 'Слева',
		alignCenter	: 'По центру',
		alignRight	: 'Справа',
		width		: 'Ширина',
		widthPx		: 'пикселей',
		widthPc		: 'процентов',
		widthUnit	: 'width unit', // MISSING
		height		: 'Высота',
		cellSpace	: 'Промежуток (spacing)',
		cellPad		: 'Отступ (padding)',
		caption		: 'Заголовок',
		summary		: 'Резюме',
		headers		: 'Заголовки',
		headersNone		: 'Нет',
		headersColumn	: 'Первый столбец',
		headersRow		: 'Первая строка',
		headersBoth		: 'Оба варианта',
		invalidRows		: 'Число строк должно быть больше 0.',
		invalidCols		: 'Число столбцов должно быть больше 0.',
		invalidBorder	: 'Ширина бордюра должна быть числом.',
		invalidWidth	: 'Ширина таблицы должна быть числом.',
		invalidHeight	: 'Высота таблицы должна быть числом.',
		invalidCellSpacing	: 'Размер промежутков (cellspacing) между ячейками должны быть числом.',
		invalidCellPadding	: 'Отступы внутри ячеек (cellpadding) должны быть числом.',

		cell :
		{
			menu			: 'Ячейка',
			insertBefore	: 'Вставить ячейку до',
			insertAfter		: 'Вставить ячейку после',
			deleteCell		: 'Удалить ячейки',
			merge			: 'Объединить ячейки',
			mergeRight		: 'Объединить с правой',
			mergeDown		: 'Объединить с нижней',
			splitHorizontal	: 'Разбить ячейку горизонтально',
			splitVertical	: 'Разбить ячейку вертикально',
			title			: 'Свойства ячейки',
			cellType		: 'Тип ячейки',
			rowSpan			: 'Rows Span',
			colSpan			: 'Columns Span',
			wordWrap		: 'Перенос по словам',
			hAlign			: 'Выравнивание по горизонтали',
			vAlign			: 'Выравнивание по вертикали',
			alignTop		: 'По верху',
			alignMiddle		: 'Посередине',
			alignBottom		: 'По низу',
			alignBaseline	: 'По базовой линии',
			bgColor			: 'Цвет фона',
			borderColor		: 'Цвет границы',
			data			: 'Данные',
			header			: 'Заголовок',
			yes				: 'Да',
			no				: 'Нет',
			invalidWidth	: 'Ширина ячейки должна быть числом.',
			invalidHeight	: 'Высота ячейки должна быть числом.',
			invalidRowSpan	: 'Rows span must be a whole number.',
			invalidColSpan	: 'Columns span must be a whole number.',
			chooseColor		: 'Выберите'
		},

		row :
		{
			menu			: 'Строка',
			insertBefore	: 'Вставить строку до',
			insertAfter		: 'Вставить строку после',
			deleteRow		: 'Удалить строки'
		},

		column :
		{
			menu			: 'Колонка',
			insertBefore	: 'Вставить колонку до',
			insertAfter		: 'Вставить колонку после',
			deleteColumn	: 'Удалить колонки'
		}
	},

	// Button Dialog.
	button :
	{
		title		: 'Свойства кнопки',
		text		: 'Текст (Значение)',
		type		: 'Тип',
		typeBtn		: 'Кнопка',
		typeSbm		: 'Отправить',
		typeRst		: 'Сбросить'
	},

	// Checkbox and Radio Button Dialogs.
	checkboxAndRadio :
	{
		checkboxTitle : 'Свойства флаговой кнопки',
		radioTitle	: 'Свойства кнопки выбора',
		value		: 'Значение',
		selected	: 'Выбранная'
	},

	// Form Dialog.
	form :
	{
		title		: 'Свойства формы',
		menu		: 'Свойства формы',
		action		: 'Действие',
		method		: 'Метод',
		encoding	: 'Кодировка'
	},

	// Select Field Dialog.
	select :
	{
		title		: 'Свойства списка',
		selectInfo	: 'Информация',
		opAvail		: 'Доступные варианты',
		value		: 'Значение',
		size		: 'Размер',
		lines		: 'линии',
		chkMulti	: 'Разрешить множественный выбор',
		opText		: 'Текст',
		opValue		: 'Значение',
		btnAdd		: 'Добавить',
		btnModify	: 'Модифицировать',
		btnUp		: 'Вверх',
		btnDown		: 'Вниз',
		btnSetValue : 'Установить как выбранное значение',
		btnDelete	: 'Удалить'
	},

	// Textarea Dialog.
	textarea :
	{
		title		: 'Свойства текстовой области',
		cols		: 'Колонки',
		rows		: 'Строки'
	},

	// Text Field Dialog.
	textfield :
	{
		title		: 'Свойства текстового поля',
		name		: 'Имя',
		value		: 'Значение',
		charWidth	: 'Ширина',
		maxChars	: 'Макс. кол-во символов',
		type		: 'Тип',
		typeText	: 'Текст',
		typePass	: 'Пароль'
	},

	// Hidden Field Dialog.
	hidden :
	{
		title	: 'Свойства скрытого поля',
		name	: 'Имя',
		value	: 'Значение'
	},

	// Image Dialog.
	image :
	{
		title		: 'Свойства изображения',
		titleButton	: 'Свойства кнопки с изображением',
		menu		: 'Свойства изображения',
		infoTab		: 'Информация о изображении',
		btnUpload	: 'Отправить на сервер',
		upload		: 'Закачать',
		alt			: 'Альтернативный текст',
		width		: 'Ширина',
		height		: 'Высота',
		lockRatio	: 'Сохранять пропорции',
		unlockRatio	: 'Unlock Ratio', // MISSING
		resetSize	: 'Сбросить размер',
		border		: 'Бордюр',
		hSpace		: 'Горизонтальный отступ',
		vSpace		: 'Вертикальный отступ',
		align		: 'Выравнивание',
		alignLeft	: 'По левому краю',
		alignRight	: 'По правому краю',
		alertUrl	: 'Пожалуйста, введите URL изображения',
		linkTab		: 'Ссылка',
		button2Img	: 'Do you want to transform the selected image button on a simple image?',
		img2Button	: 'Do you want to transform the selected image on a image button?',
		urlMissing	: 'Отсутствует URL картинки.',
		validateWidth	: 'Width must be a whole number.', // MISSING
		validateHeight	: 'Height must be a whole number.', // MISSING
		validateBorder	: 'Border must be a whole number.', // MISSING
		validateHSpace	: 'HSpace must be a whole number.', // MISSING
		validateVSpace	: 'VSpace must be a whole number.' // MISSING
	},

	// Flash Dialog
	flash :
	{
		properties		: 'Свойства Flash',
		propertiesTab	: 'Свойства',
		title			: 'Свойства Flash',
		chkPlay			: 'Авто проигрывание',
		chkLoop			: 'Повтор',
		chkMenu			: 'Включить меню Flash',
		chkFull			: 'разрешить полноэкранный режим',
 		scale			: 'Масштабировать',
		scaleAll		: 'Показывать все',
		scaleNoBorder	: 'Без бордюра',
		scaleFit		: 'Точное совпадение',
		access			: 'Область доступа скрипта',
		accessAlways	: 'Всегда',
		accessSameDomain: 'Тот же домен',
		accessNever		: 'Никогда',
		align			: 'Выравнивание',
		alignLeft		: 'По левому краю',
		alignAbsBottom	: 'Абс понизу',
		alignAbsMiddle	: 'Абс посередине',
		alignBaseline	: 'По базовой линии',
		alignBottom		: 'Понизу',
		alignMiddle		: 'Посередине',
		alignRight		: 'По правому краю',
		alignTextTop	: 'Текст наверху',
		alignTop		: 'По верху',
		quality			: 'Качество',
		qualityBest		: 'Лучшее',
		qualityHigh		: 'Высокое',
		qualityAutoHigh	: 'Высокое (авто)',
		qualityMedium	: 'Среднее',
		qualityAutoLow	: 'Низкое (авто)',
		qualityLow		: 'Низкое',
		windowModeWindow: 'Окно',
		windowModeOpaque: 'Непрозрачный',
		windowModeTransparent : 'Прозрачный',
		windowMode		: 'Оконный режим',
		flashvars		: 'Переменные для Flash',
		bgcolor			: 'Цвет фона',
		width			: 'Ширина',
		height			: 'Высота',
		hSpace			: 'Горизонтальный отступ',
		vSpace			: 'Вертикальный отступ',
		validateSrc		: 'Пожалуйста, введите URL ссылки',
		validateWidth	: 'Ширина задается числом.',
		validateHeight	: 'Высота задается числом.',
		validateHSpace	: 'Горизонтальный отступ задается числом.',
		validateVSpace	: 'Вертикальный отступ задается числом.'
	},

	// Speller Pages Dialog
	spellCheck :
	{
		toolbar			: 'Проверить орфографию',
		title			: 'Проверка правописания',
		notAvailable	: 'Извините, сервис сейчас недоступен.',
		errorLoading	: 'Ошибка при загрузке служебного хоста приложения: %s.',
		notInDic		: 'Нет в словаре',
		changeTo		: 'Заменить на',
		btnIgnore		: 'Игнорировать',
		btnIgnoreAll	: 'Игнорировать все',
		btnReplace		: 'Заменить',
		btnReplaceAll	: 'Заменить все',
		btnUndo			: 'Отменить',
		noSuggestions	: '- Нет предположений -',
		progress		: 'Идет проверка орфографии...',
		noMispell		: 'Проверка орфографии закончена: ошибок не найдено',
		noChanges		: 'Проверка орфографии закончена: ни одного слова не изменено',
		oneChange		: 'Проверка орфографии закончена: одно слово изменено',
		manyChanges		: 'Проверка орфографии закончена: 1% слов изменено',
		ieSpellDownload	: 'Модуль проверки орфографии не установлен. Хотите скачать его сейчас?'
	},

	smiley :
	{
		toolbar	: 'Смайлик',
		title	: 'Вставить смайлик'
	},

	elementsPath :
	{
		eleLabel : 'Elements path', // MISSING
		eleTitle : '%1 элемент'
	},

	numberedlist	: 'Нумерованный список',
	bulletedlist	: 'Маркированный список',
	indent			: 'Увеличить отступ',
	outdent			: 'Уменьшить отступ',

	justify :
	{
		left	: 'По левому краю',
		center	: 'По центру',
		right	: 'По правому краю',
		block	: 'По ширине'
	},

	blockquote : 'Цитата',

	clipboard :
	{
		title		: 'Вставить',
		cutError	: 'Настройки безопасности вашего браузера не позволяют редактору автоматически выполнять операции вырезания. Пожалуйста, используйте клавиатуру для этого (Ctrl+X).',
		copyError	: 'Настройки безопасности вашего браузера не позволяют редактору автоматически выполнять операции копирования. Пожалуйста, используйте клавиатуру для этого (Ctrl+C).',
		pasteMsg	: 'Пожалуйста, вставьте текст в прямоугольник, используя сочетание клавиш (<STRONG>Ctrl+V</STRONG>), и нажмите <STRONG>OK</STRONG>.',
		securityMsg	: 'По причине настроек безопасности браузера, редактор не имеет доступа к данным буфера обмена напрямую. Вам необходимо вставить текст снова в это окно.',
		pasteArea	: 'Paste Area' // MISSING
	},

	pastefromword :
	{
		confirmCleanup	: 'Текст, который вы хотите вставить, похож на копируемый из Word. Вы хотите очистить его перед вставкой?',
		toolbar			: 'Вставить из Word',
		title			: 'Вставить из Word',
		error			: 'Невозможно очистить вставленные данные из-за внутренней ошибки'
	},

	pasteText :
	{
		button	: 'Вставить только текст',
		title	: 'Вставить только текст'
	},

	templates :
	{
		button			: 'Шаблоны',
		title			: 'Шаблоны содержимого',
		insertOption	: 'Заменить текущее содержание',
		selectPromptMsg	: 'Пожалуйста, выберете шаблон для открытия в редакторе<br>(текущее содержимое будет потеряно):',
		emptyListMsg	: '(Ни одного шаблона не определено)'
	},

	showBlocks : 'Показать блоки',

	stylesCombo :
	{
		label		: 'Стиль',
		panelTitle	: 'Formatting Styles', // MISSING
		panelTitle1	: 'Block Styles',
		panelTitle2	: 'Inline Styles',
		panelTitle3	: 'Стили объекта'
	},

	format :
	{
		label		: 'Форматирование',
		panelTitle	: 'Форматирование',

		tag_p		: 'Нормальный',
		tag_pre		: 'Форматированный',
		tag_address	: 'Адрес',
		tag_h1		: 'Заголовок 1',
		tag_h2		: 'Заголовок 2',
		tag_h3		: 'Заголовок 3',
		tag_h4		: 'Заголовок 4',
		tag_h5		: 'Заголовок 5',
		tag_h6		: 'Заголовок 6',
		tag_div		: 'Нормальный (DIV)'
	},

	div :
	{
		title				: 'Создать Div-контейнер',
		toolbar				: 'Создать Div-контейнер',
		cssClassInputLabel	: 'Классы таблицы стилей',
		styleSelectLabel	: 'Стиль',
		IdInputLabel		: 'Id',
		languageCodeInputLabel	: 'Код языка',
		inlineStyleInputLabel	: 'Локальный стиль',
		advisoryTitleInputLabel	: 'Advisory Title',
		langDirLabel		: 'Направление письма',
		langDirLTRLabel		: 'Слева направо (LTR)',
		langDirRTLLabel		: 'Справа налево (RTL)',
		edit				: 'Редактировать Div',
		remove				: 'Убрать Div'
  	},

	font :
	{
		label		: 'Шрифт',
		voiceLabel	: 'Шрифт',
		panelTitle	: 'Шрифт'
	},

	fontSize :
	{
		label		: 'Размер',
		voiceLabel	: 'Размер шрифта',
		panelTitle	: 'Размер'
	},

	colorButton :
	{
		textColorTitle	: 'Цвет текста',
		bgColorTitle	: 'Цвет фона',
		panelTitle		: 'Colors', // MISSING
		auto			: 'Автоматический',
		more			: 'Цвета...'
	},

	colors :
	{
		'000' : 'Черный',
		'800000' : 'Бордовый',
		'8B4513' : 'Старой кожи',
		'2F4F4F' : 'Темный синевато-серый',
		'008080' : 'Чайный',
		'000080' : 'Темно-синиый',
		'4B0082' : 'Индиго',
		'696969' : 'Грязно-серый',
		'B22222' : 'Огнеупорный кирпич',
		'A52A2A' : 'Коричневый',
		'DAA520' : 'Красное золото',
		'006400' : 'Темно-зеленый',
		'40E0D0' : 'Бирюзовый',
		'0000CD' : 'Синий',
		'800080' : 'Пурпурный',
		'808080' : 'Серый',
		'F00' : 'Красный',
		'FF8C00' : 'Темно-оранжевый',
		'FFD700' : 'Золотой',
		'008000' : 'Зеленый',
		'0FF' : 'Морской волны',
		'00F' : 'Голубой',
		'EE82EE' : 'Фиолетовый',
		'A9A9A9' : 'Темно-серый',
		'FFA07A' : 'Светлый оранжево-розовый',
		'FFA500' : 'Оранжевый',
		'FFFF00' : 'Желтый',
		'00FF00' : 'Известковый',
		'AFEEEE' : 'Бледно-бирюзовый',
		'ADD8E6' : 'Свелто-синий',
		'DDA0DD' : 'Сливовый',
		'D3D3D3' : 'Светло-серый',
		'FFF0F5' : 'Бледный розово-лиловый ',
		'FAEBD7' : 'Античный белый',
		'FFFFE0' : 'Светло-желтый',
		'F0FFF0' : 'Свежего меда',
		'F0FFFF' : 'Лазурь',
		'F0F8FF' : 'Бледно-голубой',
		'E6E6FA' : 'Бледно-лиловый',
		'FFF' : 'Белый'
	},

	scayt :
	{
		title			: 'Проверка Орфографии по Мере Ввода',
		enable			: 'Включить ПОМВ',
		disable			: 'Отключить ПОМВ',
		about			: 'О ПОМВ',
		toggle			: 'Переключить ПОМВ',
		options			: 'Настройки',
		langs			: 'Языки',
		moreSuggestions	: 'Больше вариантов',
		ignore			: 'Пропустить',
		ignoreAll		: 'Пропустить всё',
		addWord			: 'Добавить слово',
		emptyDic		: 'Имя словаря должно быть не пустым.',
		optionsTab		: 'Настройки',
		languagesTab	: 'Языки',
		dictionariesTab	: 'Словари',
		aboutTab		: 'О словарях'
	},

	about :
	{
		title		: 'О программе CKEditor',
		dlgTitle	: 'О программе CKEditor',
		moreInfo	: 'По вопросам лицензирования обращайтесь на наш сайт:',
		copy		: 'Copyright &copy; $1. Все права защищены.'
	},

	maximize : 'Максимизировать',
	minimize : 'Минимизировать',

	fakeobjects :
	{
		anchor	: 'Якорь',
		flash	: 'Flash-анимация',
		div		: 'Разрыв страницы',
		unknown	: 'Неизвестный объект'
	},

	resize : 'Перетащите для изменения размера',

	colordialog :
	{
		title		: 'Выберите цвет',
		highlight	: 'Выделить',
		selected	: 'Выбранное',
		clear		: 'Очистить'
	},

	toolbarCollapse	: 'Свернуть панель инструментов',
	toolbarExpand	: 'Развернуть панель инструментов'
};
