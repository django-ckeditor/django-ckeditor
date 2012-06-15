﻿/*
Copyright (c) 2003-2010, CKSource - Frederico Knabben. All rights reserved.
For licensing, see LICENSE.html or http://ckeditor.com/license
*/

/**
 * @fileOverview Defines the {@link CKEDITOR.lang} object, for the
 * Catalan language.
 */

/**#@+
   @type String
   @example
*/

/**
 * Constains the dictionary of language entries.
 * @namespace
 */
CKEDITOR.lang['ca'] =
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
	source			: 'Codi font',
	newPage			: 'Nova Pàgina',
	save			: 'Desa',
	preview			: 'Visualització prèvia',
	cut				: 'Retalla',
	copy			: 'Copia',
	paste			: 'Enganxa',
	print			: 'Imprimeix',
	underline		: 'Subratllat',
	bold			: 'Negreta',
	italic			: 'Cursiva',
	selectAll		: 'Selecciona-ho tot',
	removeFormat	: 'Elimina Format',
	strike			: 'Barrat',
	subscript		: 'Subíndex',
	superscript		: 'Superíndex',
	horizontalrule	: 'Insereix línia horitzontal',
	pagebreak		: 'Insereix salt de pàgina',
	unlink			: 'Elimina l\'enllaç',
	undo			: 'Desfés',
	redo			: 'Refés',

	// Common messages and labels.
	common :
	{
		browseServer	: 'Veure servidor',
		url				: 'URL',
		protocol		: 'Protocol',
		upload			: 'Puja',
		uploadSubmit	: 'Envia-la al servidor',
		image			: 'Imatge',
		flash			: 'Flash',
		form			: 'Formulari',
		checkbox		: 'Casella de verificació',
		radio			: 'Botó d\'opció',
		textField		: 'Camp de text',
		textarea		: 'Àrea de text',
		hiddenField		: 'Camp ocult',
		button			: 'Botó',
		select			: 'Camp de selecció',
		imageButton		: 'Botó d\'imatge',
		notSet			: '<no definit>',
		id				: 'Id',
		name			: 'Nom',
		langDir			: 'Direcció de l\'idioma',
		langDirLtr		: 'D\'esquerra a dreta (LTR)',
		langDirRtl		: 'De dreta a esquerra (RTL)',
		langCode		: 'Codi d\'idioma',
		longDescr		: 'Descripció llarga de la URL',
		cssClass		: 'Classes del full d\'estil',
		advisoryTitle	: 'Títol consultiu',
		cssStyle		: 'Estil',
		ok				: 'D\'acord',
		cancel			: 'Cancel·la',
		close			: 'Close', // MISSING
		preview			: 'Preview', // MISSING
		generalTab		: 'General',
		advancedTab		: 'Avançat',
		validateNumberFailed : 'Aquest valor no és un número.',
		confirmNewPage	: 'Els canvis en aquest contingut que no es desin es perdran. Esteu segur que voleu carregar una pàgina nova?',
		confirmCancel	: 'Algunes opcions s\'han canviat. Esteu segur que voleu tancar la finestra de diàleg?',
		options			: 'Options', // MISSING
		target			: 'Target', // MISSING
		targetNew		: 'New Window (_blank)', // MISSING
		targetTop		: 'Topmost Window (_top)', // MISSING
		targetSelf		: 'Same Window (_self)', // MISSING
		targetParent	: 'Parent Window (_parent)', // MISSING

		// Put the voice-only part of the label in the span.
		unavailable		: '%1<span class="cke_accessibility">, no disponible</span>'
	},

	// Special char dialog.
	specialChar		:
	{
		toolbar		: 'Insereix caràcter especial',
		title		: 'Selecciona el caràcter especial'
	},

	// Link dialog.
	link :
	{
		toolbar		: 'Insereix/Edita enllaç',
		menu		: 'Edita l\'enllaç',
		title		: 'Enllaç',
		info		: 'Informació de l\'enllaç',
		target		: 'Destí',
		upload		: 'Puja',
		advanced	: 'Avançat',
		type		: 'Tipus d\'enllaç',
		toUrl		: 'URL', // MISSING
		toAnchor	: 'Àncora en aquesta pàgina',
		toEmail		: 'Correu electrònic',
		targetFrame		: '<marc>',
		targetPopup		: '<finestra emergent>',
		targetFrameName	: 'Nom del marc de destí',
		targetPopupName	: 'Nom finestra popup',
		popupFeatures	: 'Característiques finestra popup',
		popupResizable	: 'Redimensionable',
		popupStatusBar	: 'Barra d\'estat',
		popupLocationBar: 'Barra d\'adreça',
		popupToolbar	: 'Barra d\'eines',
		popupMenuBar	: 'Barra de menú',
		popupFullScreen	: 'Pantalla completa (IE)',
		popupScrollBars	: 'Barres d\'scroll',
		popupDependent	: 'Depenent (Netscape)',
		popupWidth		: 'Amplada',
		popupLeft		: 'Posició esquerra',
		popupHeight		: 'Alçada',
		popupTop		: 'Posició dalt',
		id				: 'Id',
		langDir			: 'Direcció de l\'idioma',
		langDirLTR		: 'D\'esquerra a dreta (LTR)',
		langDirRTL		: 'De dreta a esquerra (RTL)',
		acccessKey		: 'Clau d\'accés',
		name			: 'Nom',
		langCode		: 'Direcció de l\'idioma',
		tabIndex		: 'Index de Tab',
		advisoryTitle	: 'Títol consultiu',
		advisoryContentType	: 'Tipus de contingut consultiu',
		cssClasses		: 'Classes del full d\'estil',
		charset			: 'Conjunt de caràcters font enllaçat',
		styles			: 'Estil',
		selectAnchor	: 'Selecciona una àncora',
		anchorName		: 'Per nom d\'àncora',
		anchorId		: 'Per Id d\'element',
		emailAddress	: 'Adreça de correu electrònic',
		emailSubject	: 'Assumpte del missatge',
		emailBody		: 'Cos del missatge',
		noAnchors		: '(No hi ha àncores disponibles en aquest document)',
		noUrl			: 'Si us plau, escrigui l\'enllaç URL',
		noEmail			: 'Si us plau, escrigui l\'adreça correu electrònic'
	},

	// Anchor dialog
	anchor :
	{
		toolbar		: 'Insereix/Edita àncora',
		menu		: 'Propietats de l\'àncora',
		title		: 'Propietats de l\'àncora',
		name		: 'Nom de l\'àncora',
		errorName	: 'Si us plau, escriviu el nom de l\'ancora'
	},

	// Find And Replace Dialog
	findAndReplace :
	{
		title				: 'Cerca i reemplaça',
		find				: 'Cerca',
		replace				: 'Reemplaça',
		findWhat			: 'Cerca:',
		replaceWith			: 'Remplaça amb:',
		notFoundMsg			: 'El text especificat no s\'ha trobat.',
		matchCase			: 'Distingeix majúscules/minúscules',
		matchWord			: 'Només paraules completes',
		matchCyclic			: 'Match cyclic',
		replaceAll			: 'Reemplaça-ho tot',
		replaceSuccessMsg	: '%1 ocurrència/es reemplaçada/es.'
	},

	// Table Dialog
	table :
	{
		toolbar		: 'Taula',
		title		: 'Propietats de la taula',
		menu		: 'Propietats de la taula',
		deleteTable	: 'Suprimeix la taula',
		rows		: 'Files',
		columns		: 'Columnes',
		border		: 'Mida vora',
		align		: 'Alineació',
		alignLeft	: 'Esquerra',
		alignCenter	: 'Centre',
		alignRight	: 'Dreta',
		width		: 'Amplada',
		widthPx		: 'píxels',
		widthPc		: 'percentatge',
		widthUnit	: 'width unit', // MISSING
		height		: 'Alçada',
		cellSpace	: 'Espaiat de cel·les',
		cellPad		: 'Encoixinament de cel·les',
		caption		: 'Títol',
		summary		: 'Resum',
		headers		: 'Capçaleres',
		headersNone		: 'Cap',
		headersColumn	: 'Primera columna',
		headersRow		: 'Primera fila',
		headersBoth		: 'Ambdues',
		invalidRows		: 'El nombre de files ha de ser un nombre major que 0.',
		invalidCols		: 'El nombre de columnes ha de ser un nombre major que 0.',
		invalidBorder	: 'El gruix de la vora ha de ser un nombre.',
		invalidWidth	: 'L\'amplada de la taula  ha de ser un nombre.',
		invalidHeight	: 'L\'alçada de la taula  ha de ser un nombre.',
		invalidCellSpacing	: 'L\'espaiat de cel·la  ha de ser un nombre.',
		invalidCellPadding	: 'L\'encoixinament de cel·la  ha de ser un nombre.',

		cell :
		{
			menu			: 'Cel·la',
			insertBefore	: 'Insereix cel·la abans de',
			insertAfter		: 'Insereix cel·la darrera',
			deleteCell		: 'Suprimeix les cel·les',
			merge			: 'Fusiona les cel·les',
			mergeRight		: 'Fusiona cap a la dreta',
			mergeDown		: 'Fusiona cap avall',
			splitHorizontal	: 'Divideix la cel·la horitzontalment',
			splitVertical	: 'Divideix la cel·la verticalment',
			title			: 'Propertiat de la cel·la',
			cellType		: 'Tipus de cel·la',
			rowSpan			: 'Expansió de files',
			colSpan			: 'Expansió de columnes',
			wordWrap		: 'Ajustar al contingut',
			hAlign			: 'Aliniació Horizontal',
			vAlign			: 'Aliniació Vertical',
			alignTop		: 'A dalt',
			alignMiddle		: 'Al mig',
			alignBottom		: 'A baix',
			alignBaseline	: 'A la línia base',
			bgColor			: 'Color de fons',
			borderColor		: 'Color de la vora',
			data			: 'Data',
			header			: 'Capçalera',
			yes				: 'Sí',
			no				: 'No',
			invalidWidth	: 'L\'amplada de cel·la ha de ser un nombre.',
			invalidHeight	: 'L\'alçada de cel·la ha de ser un nombre.',
			invalidRowSpan	: 'L\'expansió de files ha de ser un nombre enter.',
			invalidColSpan	: 'L\'expansió de columnes ha de ser un nombre enter.',
			chooseColor		: 'Choose' // MISSING
		},

		row :
		{
			menu			: 'Fila',
			insertBefore	: 'Insereix fila abans de',
			insertAfter		: 'Insereix fila darrera',
			deleteRow		: 'Suprimeix una fila'
		},

		column :
		{
			menu			: 'Columna',
			insertBefore	: 'Insereix columna abans de',
			insertAfter		: 'Insereix columna darrera',
			deleteColumn	: 'Suprimeix una columna'
		}
	},

	// Button Dialog.
	button :
	{
		title		: 'Propietats del botó',
		text		: 'Text (Valor)',
		type		: 'Tipus',
		typeBtn		: 'Botó',
		typeSbm		: 'Transmet formulari',
		typeRst		: 'Reinicia formulari'
	},

	// Checkbox and Radio Button Dialogs.
	checkboxAndRadio :
	{
		checkboxTitle : 'Propietats de la casella de verificació',
		radioTitle	: 'Propietats del botó d\'opció',
		value		: 'Valor',
		selected	: 'Seleccionat'
	},

	// Form Dialog.
	form :
	{
		title		: 'Propietats del formulari',
		menu		: 'Propietats del formulari',
		action		: 'Acció',
		method		: 'Mètode',
		encoding	: 'Codificació'
	},

	// Select Field Dialog.
	select :
	{
		title		: 'Propietats del camp de selecció',
		selectInfo	: 'Info',
		opAvail		: 'Opcions disponibles',
		value		: 'Valor',
		size		: 'Mida',
		lines		: 'Línies',
		chkMulti	: 'Permet múltiples seleccions',
		opText		: 'Text',
		opValue		: 'Valor',
		btnAdd		: 'Afegeix',
		btnModify	: 'Modifica',
		btnUp		: 'Amunt',
		btnDown		: 'Avall',
		btnSetValue : 'Selecciona per defecte',
		btnDelete	: 'Elimina'
	},

	// Textarea Dialog.
	textarea :
	{
		title		: 'Propietats de l\'àrea de text',
		cols		: 'Columnes',
		rows		: 'Files'
	},

	// Text Field Dialog.
	textfield :
	{
		title		: 'Propietats del camp de text',
		name		: 'Nom',
		value		: 'Valor',
		charWidth	: 'Amplada',
		maxChars	: 'Nombre màxim de caràcters',
		type		: 'Tipus',
		typeText	: 'Text',
		typePass	: 'Contrasenya'
	},

	// Hidden Field Dialog.
	hidden :
	{
		title	: 'Propietats del camp ocult',
		name	: 'Nom',
		value	: 'Valor'
	},

	// Image Dialog.
	image :
	{
		title		: 'Propietats de la imatge',
		titleButton	: 'Propietats del botó d\'imatge',
		menu		: 'Propietats de la imatge',
		infoTab		: 'Informació de la imatge',
		btnUpload	: 'Envia-la al servidor',
		upload		: 'Puja',
		alt			: 'Text alternatiu',
		width		: 'Amplada',
		height		: 'Alçada',
		lockRatio	: 'Bloqueja les proporcions',
		unlockRatio	: 'Unlock Ratio', // MISSING
		resetSize	: 'Restaura la mida',
		border		: 'Vora',
		hSpace		: 'Espaiat horit.',
		vSpace		: 'Espaiat vert.',
		align		: 'Alineació',
		alignLeft	: 'Ajusta a l\'esquerra',
		alignRight	: 'Ajusta a la dreta',
		alertUrl	: 'Si us plau, escriviu la URL de la imatge',
		linkTab		: 'Enllaç',
		button2Img	: 'Voleu transformar el botó d\'imatge seleccionat en una simple imatge?',
		img2Button	: 'Voleu transformar la imatge seleccionada en un botó d\'imatge?',
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
		properties		: 'Propietats del Flash',
		propertiesTab	: 'Propietats',
		title			: 'Propietats del Flash',
		chkPlay			: 'Reprodució automàtica',
		chkLoop			: 'Bucle',
		chkMenu			: 'Habilita menú Flash',
		chkFull			: 'Permetre la pantalla completa',
 		scale			: 'Escala',
		scaleAll		: 'Mostra-ho tot',
		scaleNoBorder	: 'Sense vores',
		scaleFit		: 'Mida exacta',
		access			: 'Accés a scripts',
		accessAlways	: 'Sempre',
		accessSameDomain: 'El mateix domini',
		accessNever		: 'Mai',
		align			: 'Alineació',
		alignLeft		: 'Ajusta a l\'esquerra',
		alignAbsBottom	: 'Abs Bottom',
		alignAbsMiddle	: 'Abs Middle',
		alignBaseline	: 'Baseline',
		alignBottom		: 'Bottom',
		alignMiddle		: 'Middle',
		alignRight		: 'Ajusta a la dreta',
		alignTextTop	: 'Text Top',
		alignTop		: 'Top',
		quality			: 'Qualitat',
		qualityBest		: 'La millor',
		qualityHigh		: 'Alta',
		qualityAutoHigh	: 'Alta automàtica',
		qualityMedium	: 'Mitjana',
		qualityAutoLow	: 'Baixa automàtica',
		qualityLow		: 'Baixa',
		windowModeWindow: 'Finestra',
		windowModeOpaque: 'Opaca',
		windowModeTransparent : 'Transparent',
		windowMode		: 'Mode de la finestra',
		flashvars		: 'Variables de Flash',
		bgcolor			: 'Color de Fons',
		width			: 'Amplada',
		height			: 'Alçada',
		hSpace			: 'Espaiat horit.',
		vSpace			: 'Espaiat vert.',
		validateSrc		: 'Si us plau, escrigui l\'enllaç URL',
		validateWidth	: 'L\'amplada ha de ser un nombre.',
		validateHeight	: 'L\'alçada ha de ser un nombre.',
		validateHSpace	: 'L\'espaiat horitzonatal ha de ser un nombre.',
		validateVSpace	: 'L\'espaiat vertical ha de ser un nombre.'
	},

	// Speller Pages Dialog
	spellCheck :
	{
		toolbar			: 'Revisa l\'ortografia',
		title			: 'Comprova l\'ortografia',
		notAvailable	: 'El servei no es troba disponible ara.',
		errorLoading	: 'Error carregant el servidor: %s.',
		notInDic		: 'No és al diccionari',
		changeTo		: 'Reemplaça amb',
		btnIgnore		: 'Ignora',
		btnIgnoreAll	: 'Ignora-les totes',
		btnReplace		: 'Canvia',
		btnReplaceAll	: 'Canvia-les totes',
		btnUndo			: 'Desfés',
		noSuggestions	: 'Cap suggeriment',
		progress		: 'Verificació ortogràfica en curs...',
		noMispell		: 'Verificació ortogràfica acabada: no hi ha cap paraula mal escrita',
		noChanges		: 'Verificació ortogràfica: no s\'ha canviat cap paraula',
		oneChange		: 'Verificació ortogràfica: s\'ha canviat una paraula',
		manyChanges		: 'Verificació ortogràfica: s\'han canviat %1 paraules',
		ieSpellDownload	: 'Verificació ortogràfica no instal·lada. Voleu descarregar-ho ara?'
	},

	smiley :
	{
		toolbar	: 'Icona',
		title	: 'Insereix una icona'
	},

	elementsPath :
	{
		eleLabel : 'Elements path', // MISSING
		eleTitle : '%1 element'
	},

	numberedlist	: 'Llista numerada',
	bulletedlist	: 'Llista de pics',
	indent			: 'Augmenta el sagnat',
	outdent			: 'Redueix el sagnat',

	justify :
	{
		left	: 'Alinia a l\'esquerra',
		center	: 'Centrat',
		right	: 'Alinia a la dreta',
		block	: 'Justificat'
	},

	blockquote : 'Bloc de cita',

	clipboard :
	{
		title		: 'Enganxa',
		cutError	: 'La seguretat del vostre navegador no permet executar automàticament les operacions de retallar. Si us plau, utilitzeu el teclat (Ctrl+X).',
		copyError	: 'La seguretat del vostre navegador no permet executar automàticament les operacions de copiar. Si us plau, utilitzeu el teclat (Ctrl+C).',
		pasteMsg	: 'Si us plau, enganxeu dins del següent camp utilitzant el teclat (<STRONG>Ctrl+V</STRONG>) i premeu <STRONG>OK</STRONG>.',
		securityMsg	: 'A causa de la configuració de seguretat del vostre navegador, l\'editor no pot accedir al porta-retalls directament. Enganxeu-ho un altre cop en aquesta finestra.',
		pasteArea	: 'Paste Area' // MISSING
	},

	pastefromword :
	{
		confirmCleanup	: 'El text que voleu enganxar sembla provenir de Word. Voleu netejar aquest text abans que sigui enganxat?',
		toolbar			: 'Enganxa des del Word',
		title			: 'Enganxa des del Word',
		error			: 'It was not possible to clean up the pasted data due to an internal error' // MISSING
	},

	pasteText :
	{
		button	: 'Enganxa com a text no formatat',
		title	: 'Enganxa com a text no formatat'
	},

	templates :
	{
		button			: 'Plantilles',
		title			: 'Contingut plantilles',
		insertOption	: 'Reemplaça el contingut actual',
		selectPromptMsg	: 'Si us plau, seleccioneu la plantilla per obrir a l\'editor<br>(el contingut actual no serà enregistrat):',
		emptyListMsg	: '(No hi ha plantilles definides)'
	},

	showBlocks : 'Mostra els blocs',

	stylesCombo :
	{
		label		: 'Estil',
		panelTitle	: 'Formatting Styles', // MISSING
		panelTitle1	: 'Estils de bloc',
		panelTitle2	: 'Estils incrustats',
		panelTitle3	: 'Estils d\'objecte'
	},

	format :
	{
		label		: 'Format',
		panelTitle	: 'Format',

		tag_p		: 'Normal',
		tag_pre		: 'Formatejat',
		tag_address	: 'Adreça',
		tag_h1		: 'Encapçalament 1',
		tag_h2		: 'Encapçalament 2',
		tag_h3		: 'Encapçalament 3',
		tag_h4		: 'Encapçalament 4',
		tag_h5		: 'Encapçalament 5',
		tag_h6		: 'Encapçalament 6',
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
		label		: 'Tipus de lletra',
		voiceLabel	: 'Tipus de lletra',
		panelTitle	: 'Tipus de lletra'
	},

	fontSize :
	{
		label		: 'Mida',
		voiceLabel	: 'Mida de la lletra',
		panelTitle	: 'Mida'
	},

	colorButton :
	{
		textColorTitle	: 'Color de Text',
		bgColorTitle	: 'Color de Fons',
		panelTitle		: 'Colors', // MISSING
		auto			: 'Automàtic',
		more			: 'Més colors...'
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
		title			: 'Spell Check As You Type',
		enable			: 'Habilitat l\'SCAYT',
		disable			: 'Deshabilita SCAYT',
		about			: 'Quant a l\'SCAYT',
		toggle			: 'Commuta l\'SCAYT',
		options			: 'Opcions',
		langs			: 'Idiomes',
		moreSuggestions	: 'Més suggerències',
		ignore			: 'Ignora',
		ignoreAll		: 'Ignora\'ls tots',
		addWord			: 'Afegeix una paraula',
		emptyDic		: 'El nom del diccionari no hauria d\'estar buit.',
		optionsTab		: 'Opcions',
		languagesTab	: 'Idiomes',
		dictionariesTab	: 'Diccionaris',
		aboutTab		: 'Quant a'
	},

	about :
	{
		title		: 'Quan al CKEditor',
		dlgTitle	: 'Quan al CKEditor',
		moreInfo	: 'Per informació sobre llicències visiteu el web:',
		copy		: 'Copyright &copy; $1. All rights reserved.'
	},

	maximize : 'Maximiza',
	minimize : 'Minimize', // MISSING

	fakeobjects :
	{
		anchor	: 'Àncora',
		flash	: 'Animació Flash',
		div		: 'Salt de pàgina',
		unknown	: 'Objecte desconegut'
	},

	resize : 'Arrossegueu per redimensionar',

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
