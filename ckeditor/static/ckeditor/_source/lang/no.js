﻿/*
Copyright (c) 2003-2010, CKSource - Frederico Knabben. All rights reserved.
For licensing, see LICENSE.html or http://ckeditor.com/license
*/

/**
 * @fileOverview Defines the {@link CKEDITOR.lang} object, for the
 * Norwegian language.
 */

/**#@+
   @type String
   @example
*/

/**
 * Constains the dictionary of language entries.
 * @namespace
 */
CKEDITOR.lang['no'] =
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
	source			: 'Kilde',
	newPage			: 'Ny Side',
	save			: 'Lagre',
	preview			: 'Forhåndsvis',
	cut				: 'Klipp ut',
	copy			: 'Kopier',
	paste			: 'Lim inn',
	print			: 'Skriv ut',
	underline		: 'Understrek',
	bold			: 'Fet',
	italic			: 'Kursiv',
	selectAll		: 'Merk alt',
	removeFormat	: 'Fjern format',
	strike			: 'Gjennomstrek',
	subscript		: 'Senket skrift',
	superscript		: 'Hevet skrift',
	horizontalrule	: 'Sett inn horisontal linje',
	pagebreak		: 'Sett inn sideskift',
	unlink			: 'Fjern lenke',
	undo			: 'Angre',
	redo			: 'Gjør om',

	// Common messages and labels.
	common :
	{
		browseServer	: 'Bla igjennom server',
		url				: 'URL',
		protocol		: 'Protokoll',
		upload			: 'Last opp',
		uploadSubmit	: 'Send det til serveren',
		image			: 'Bilde',
		flash			: 'Flash',
		form			: 'Skjema',
		checkbox		: 'Avmerkingsboks',
		radio			: 'Alternativknapp',
		textField		: 'Tekstboks',
		textarea		: 'Tekstområde',
		hiddenField		: 'Skjult felt',
		button			: 'Knapp',
		select			: 'Rullegardinliste',
		imageButton		: 'Bildeknapp',
		notSet			: '<ikke satt>',
		id				: 'Id',
		name			: 'Navn',
		langDir			: 'Språkretning',
		langDirLtr		: 'Venstre til høyre (VTH)',
		langDirRtl		: 'Høyre til venstre (HTV)',
		langCode		: 'Språkkode',
		longDescr		: 'Utvidet beskrivelse',
		cssClass		: 'Stilarkklasser',
		advisoryTitle	: 'Tittel',
		cssStyle		: 'Stil',
		ok				: 'OK',
		cancel			: 'Avbryt',
		close			: 'Close', // MISSING
		preview			: 'Preview', // MISSING
		generalTab		: 'Generelt',
		advancedTab		: 'Avansert',
		validateNumberFailed : 'Denne verdien er ikke ett nummer',
		confirmNewPage	: 'Alle endringer som er gjort i dette innholdet vil bli tapt. Er du sikker på at du vil laste en ny side?',
		confirmCancel	: 'Noen av valgene har blitt endret. Er du sikker på at du vil lukke dialogen?',
		options			: 'Options', // MISSING
		target			: 'Target', // MISSING
		targetNew		: 'New Window (_blank)', // MISSING
		targetTop		: 'Topmost Window (_top)', // MISSING
		targetSelf		: 'Same Window (_self)', // MISSING
		targetParent	: 'Parent Window (_parent)', // MISSING

		// Put the voice-only part of the label in the span.
		unavailable		: '%1<span class="cke_accessibility">, utilgjenglig</span>'
	},

	// Special char dialog.
	specialChar		:
	{
		toolbar		: 'Sett inn spesielt tegn',
		title		: 'Velg spesielt tegn'
	},

	// Link dialog.
	link :
	{
		toolbar		: 'Sett inn/Rediger lenke',
		menu		: 'Rediger lenke',
		title		: 'Lenke',
		info		: 'Lenkeinfo',
		target		: 'Mål',
		upload		: 'Last opp',
		advanced	: 'Avansert',
		type		: 'Lenketype',
		toUrl		: 'URL', // MISSING
		toAnchor	: 'Lenke til anker i teksten',
		toEmail		: 'E-post',
		targetFrame		: '<ramme>',
		targetPopup		: '<popup vindu>',
		targetFrameName	: 'Målramme',
		targetPopupName	: 'Navn på popup-vindus',
		popupFeatures	: 'Egenskaper for popup-vindu',
		popupResizable	: 'Skalérbar',
		popupStatusBar	: 'Statuslinje',
		popupLocationBar: 'Adresselinje',
		popupToolbar	: 'Verktøylinje',
		popupMenuBar	: 'Menylinje',
		popupFullScreen	: 'Full skjerm (IE)',
		popupScrollBars	: 'Scrollbar',
		popupDependent	: 'Avhenging (Netscape)',
		popupWidth		: 'Bredde',
		popupLeft		: 'Venstre posisjon',
		popupHeight		: 'Høyde',
		popupTop		: 'Topp-posisjon',
		id				: 'Id',
		langDir			: 'Språkretning',
		langDirLTR		: 'Venstre til høyre (VTH)',
		langDirRTL		: 'Høyre til venstre (HTV)',
		acccessKey		: 'Aksessknapp',
		name			: 'Navn',
		langCode		: 'Språkretning',
		tabIndex		: 'Tab Indeks',
		advisoryTitle	: 'Tittel',
		advisoryContentType	: 'Type',
		cssClasses		: 'Stilarkklasser',
		charset			: 'Lenket språkkart',
		styles			: 'Stil',
		selectAnchor	: 'Velg et anker',
		anchorName		: 'Anker etter navn',
		anchorId		: 'Element etter ID',
		emailAddress	: 'E-postadresse',
		emailSubject	: 'Meldingsemne',
		emailBody		: 'Melding',
		noAnchors		: '(Ingen anker i dokumentet)',
		noUrl			: 'Vennligst skriv inn lenkens url',
		noEmail			: 'Vennligst skriv inn e-postadressen'
	},

	// Anchor dialog
	anchor :
	{
		toolbar		: 'Sett inn/Rediger anker',
		menu		: 'Egenskaper for anker',
		title		: 'Egenskaper for anker',
		name		: 'Ankernavn',
		errorName	: 'Vennligst skriv inn ankernavnet'
	},

	// Find And Replace Dialog
	findAndReplace :
	{
		title				: 'Søk og erstatt',
		find				: 'Søk',
		replace				: 'Erstatt',
		findWhat			: 'Søk etter:',
		replaceWith			: 'Erstatt med:',
		notFoundMsg			: 'Fant ikke søketeksten.',
		matchCase			: 'Skill mellom store og små bokstaver',
		matchWord			: 'Bare hele ord',
		matchCyclic			: 'Søk i hele dokumentet',
		replaceAll			: 'Erstatt alle',
		replaceSuccessMsg	: '%1 tilfelle erstattet.'
	},

	// Table Dialog
	table :
	{
		toolbar		: 'Tabell',
		title		: 'Egenskaper for tabell',
		menu		: 'Egenskaper for tabell',
		deleteTable	: 'Slett tabell',
		rows		: 'Rader',
		columns		: 'Kolonner',
		border		: 'Rammestørrelse',
		align		: 'Justering',
		alignLeft	: 'Venstre',
		alignCenter	: 'Midtjuster',
		alignRight	: 'Høyre',
		width		: 'Bredde',
		widthPx		: 'piksler',
		widthPc		: 'prosent',
		widthUnit	: 'width unit', // MISSING
		height		: 'Høyde',
		cellSpace	: 'Cellemarg',
		cellPad		: 'Cellepolstring',
		caption		: 'Tittel',
		summary		: 'Sammendrag',
		headers		: 'Overskrifter',
		headersNone		: 'Ingen',
		headersColumn	: 'Første kolonne',
		headersRow		: 'Første rad',
		headersBoth		: 'Begge',
		invalidRows		: 'Antall rader må være ett tall større enn 0.',
		invalidCols		: 'Antall kolonner må være ett tall større enn 0.',
		invalidBorder	: 'Rammestørrelse må være ett tall.',
		invalidWidth	: 'Tabellbredde må være ett nummer.',
		invalidHeight	: 'Tabellhøyde må være ett nummer.',
		invalidCellSpacing	: 'Cellemellomrom må være ett nummer.',
		invalidCellPadding	: 'Cellefyll må være ett nummer.',

		cell :
		{
			menu			: 'Celle',
			insertBefore	: 'Sett inn celle før',
			insertAfter		: 'Sett inn celle etter',
			deleteCell		: 'Slett celler',
			merge			: 'Slå sammen celler',
			mergeRight		: 'Slå sammen høyre',
			mergeDown		: 'Slå sammen ned',
			splitHorizontal	: 'Del celle horisontalt',
			splitVertical	: 'Del celle vertikalt',
			title			: 'Celleegenskaper',
			cellType		: 'Celletype',
			rowSpan			: 'Radspenn',
			colSpan			: 'Kolonnespenn',
			wordWrap		: 'Tekstbrytning',
			hAlign			: 'Horisontal justering',
			vAlign			: 'Vertikal justering',
			alignTop		: 'Topp',
			alignMiddle		: 'Midten',
			alignBottom		: 'Bunnen',
			alignBaseline	: 'Grunnlinje',
			bgColor			: 'Bakgrunnsfarge',
			borderColor		: 'Rammefarge',
			data			: 'Data',
			header			: 'Overskrift',
			yes				: 'Ja',
			no				: 'Nei',
			invalidWidth	: 'Cellebredde må være ett nummer',
			invalidHeight	: 'Cellehøyde må være ett nummer',
			invalidRowSpan	: 'Radspenn må være ett nummer.',
			invalidColSpan	: 'Kolonnespenn må være ett nummer.',
			chooseColor		: 'Velg'
		},

		row :
		{
			menu			: 'Rader',
			insertBefore	: 'Sett inn rad før',
			insertAfter		: 'Sett inn rad etter',
			deleteRow		: 'Slett rader'
		},

		column :
		{
			menu			: 'Kolonne',
			insertBefore	: 'Sett inn kolonne før',
			insertAfter		: 'Sett inn kolonne etter',
			deleteColumn	: 'Slett kolonner'
		}
	},

	// Button Dialog.
	button :
	{
		title		: 'Egenskaper for knapp',
		text		: 'Tekst (verdi)',
		type		: 'Type',
		typeBtn		: 'Knapp',
		typeSbm		: 'Send',
		typeRst		: 'Nullstill'
	},

	// Checkbox and Radio Button Dialogs.
	checkboxAndRadio :
	{
		checkboxTitle : 'Egenskaper for avmerkingsboks',
		radioTitle	: 'Egenskaper for alternativknapp',
		value		: 'Verdi',
		selected	: 'Valgt'
	},

	// Form Dialog.
	form :
	{
		title		: 'Egenskaper for skjema',
		menu		: 'Egenskaper for skjema',
		action		: 'Handling',
		method		: 'Metode',
		encoding	: 'Encoding'
	},

	// Select Field Dialog.
	select :
	{
		title		: 'Egenskaper for rullegardinliste',
		selectInfo	: 'Info',
		opAvail		: 'Tilgjenglige alternativer',
		value		: 'Verdi',
		size		: 'Størrelse',
		lines		: 'Linjer',
		chkMulti	: 'Tillat flervalg',
		opText		: 'Tekst',
		opValue		: 'Verdi',
		btnAdd		: 'Legg til',
		btnModify	: 'Endre',
		btnUp		: 'Opp',
		btnDown		: 'Ned',
		btnSetValue : 'Sett som valgt',
		btnDelete	: 'Slett'
	},

	// Textarea Dialog.
	textarea :
	{
		title		: 'Egenskaper for tekstområde',
		cols		: 'Kolonner',
		rows		: 'Rader'
	},

	// Text Field Dialog.
	textfield :
	{
		title		: 'Egenskaper for tekstfelt',
		name		: 'Navn',
		value		: 'Verdi',
		charWidth	: 'Tegnbredde',
		maxChars	: 'Maks antall tegn',
		type		: 'Type',
		typeText	: 'Tekst',
		typePass	: 'Passord'
	},

	// Hidden Field Dialog.
	hidden :
	{
		title	: 'Egenskaper for skjult felt',
		name	: 'Navn',
		value	: 'Verdi'
	},

	// Image Dialog.
	image :
	{
		title		: 'Bildeegenskaper',
		titleButton	: 'Egenskaper for bildeknapp',
		menu		: 'Bildeegenskaper',
		infoTab		: 'Bildeinformasjon',
		btnUpload	: 'Send det til serveren',
		upload		: 'Last opp',
		alt			: 'Alternativ tekst',
		width		: 'Bredde',
		height		: 'Høyde',
		lockRatio	: 'Lås forhold',
		unlockRatio	: 'Unlock Ratio', // MISSING
		resetSize	: 'Tilbakestill størrelse',
		border		: 'Ramme',
		hSpace		: 'HMarg',
		vSpace		: 'VMarg',
		align		: 'Juster',
		alignLeft	: 'Venstre',
		alignRight	: 'Høyre',
		alertUrl	: 'Vennligst skriv bilde-urlen',
		linkTab		: 'Lenke',
		button2Img	: 'Vil du endre den valgte bildeknappen til ett vanlig bilde?',
		img2Button	: 'Vil du endre det valgte bildet til en bildeknapp?',
		urlMissing	: 'Bildets adresse mangler.',
		validateWidth	: 'Width must be a whole number.', // MISSING
		validateHeight	: 'Height must be a whole number.', // MISSING
		validateBorder	: 'Border must be a whole number.', // MISSING
		validateHSpace	: 'HSpace must be a whole number.', // MISSING
		validateVSpace	: 'VSpace must be a whole number.' // MISSING
	},

	// Flash Dialog
	flash :
	{
		properties		: 'Egenskaper for Flash-objekt',
		propertiesTab	: 'Egenskaper',
		title			: 'Flash-egenskaper',
		chkPlay			: 'Autospill',
		chkLoop			: 'Loop',
		chkMenu			: 'Slå på Flash-meny',
		chkFull			: 'Tillat fullskjerm',
 		scale			: 'Skaler',
		scaleAll		: 'Vis alt',
		scaleNoBorder	: 'Ingen ramme',
		scaleFit		: 'Skaler til å passe',
		access			: 'Scripttilgang',
		accessAlways	: 'Alltid',
		accessSameDomain: 'Samme domene',
		accessNever		: 'Aldri',
		align			: 'Juster',
		alignLeft		: 'Venstre',
		alignAbsBottom	: 'Abs bunn',
		alignAbsMiddle	: 'Abs midten',
		alignBaseline	: 'Bunnlinje',
		alignBottom		: 'Bunn',
		alignMiddle		: 'Midten',
		alignRight		: 'Høyre',
		alignTextTop	: 'Tekst topp',
		alignTop		: 'Topp',
		quality			: 'Kvalitet',
		qualityBest		: 'Best',
		qualityHigh		: 'Høy',
		qualityAutoHigh	: 'Auto Høy',
		qualityMedium	: 'Medium',
		qualityAutoLow	: 'Auto Lav',
		qualityLow		: 'Lav',
		windowModeWindow: 'Vindu',
		windowModeOpaque: 'Opaque',
		windowModeTransparent : 'Gjennomsiktig',
		windowMode		: 'Vindu modus',
		flashvars		: 'Variabler for flash',
		bgcolor			: 'Bakgrunnsfarge',
		width			: 'Bredde',
		height			: 'Høyde',
		hSpace			: 'HMarg',
		vSpace			: 'VMarg',
		validateSrc		: 'Vennligst skriv inn lenkens url',
		validateWidth	: 'Bredde må være ett nummer.',
		validateHeight	: 'Høyde må være ett nummer',
		validateHSpace	: 'HSpace må være ett nummer.',
		validateVSpace	: 'VSpace må være ett nummer.'
	},

	// Speller Pages Dialog
	spellCheck :
	{
		toolbar			: 'Stavekontroll',
		title			: 'Stavekontroll',
		notAvailable	: 'Beklager, tjenesten er utilgjenglig nå.',
		errorLoading	: 'Feil under lasting av applicationstjeneste tjener: %s.',
		notInDic		: 'Ikke i ordboken',
		changeTo		: 'Endre til',
		btnIgnore		: 'Ignorer',
		btnIgnoreAll	: 'Ignorer alle',
		btnReplace		: 'Erstatt',
		btnReplaceAll	: 'Erstatt alle',
		btnUndo			: 'Angre',
		noSuggestions	: '- Ingen forslag -',
		progress		: 'Stavekontroll pågår...',
		noMispell		: 'Stavekontroll fullført: ingen feilstavinger funnet',
		noChanges		: 'Stavekontroll fullført: ingen ord endret',
		oneChange		: 'Stavekontroll fullført: Ett ord endret',
		manyChanges		: 'Stavekontroll fullført: %1 ord endret',
		ieSpellDownload	: 'Stavekontroll er ikke installert. Vil du laste den ned nå?'
	},

	smiley :
	{
		toolbar	: 'Smil',
		title	: 'Sett inn smil'
	},

	elementsPath :
	{
		eleLabel : 'Elements path', // MISSING
		eleTitle : '%1 element'
	},

	numberedlist	: 'Nummerert liste',
	bulletedlist	: 'Uordnet liste',
	indent			: 'Øk nivå',
	outdent			: 'Senk nivå',

	justify :
	{
		left	: 'Venstrejuster',
		center	: 'Midtjuster',
		right	: 'Høyrejuster',
		block	: 'Blokkjuster'
	},

	blockquote : 'Blockquote',

	clipboard :
	{
		title		: 'Lim inn',
		cutError	: 'Din nettlesers sikkerhetsinstillinger tillater ikke automatisk klipping av tekst. Vennligst bruk snareveien (Ctrl+X).',
		copyError	: 'Din nettlesers sikkerhetsinstillinger tillater ikke automatisk kopiering av tekst. Vennligst bruk snareveien (Ctrl+C).',
		pasteMsg	: 'Vennligst lim inn i den følgende boksen med tastaturet (<STRONG>Ctrl+V</STRONG>) og trykk <STRONG>OK</STRONG>.',
		securityMsg	: 'Din nettlesers sikkerhetsinstillinger gir ikke redigeringsverktøyet direkte tilgang til utklippstavlen. Du må lime det igjen i dette vinduet.',
		pasteArea	: 'Paste Area' // MISSING
	},

	pastefromword :
	{
		confirmCleanup	: 'The text you want to paste seems to be copied from Word. Do you want to clean it before pasting?', // MISSING
		toolbar			: 'Lim inn fra Word',
		title			: 'Lim inn fra Word',
		error			: 'It was not possible to clean up the pasted data due to an internal error' // MISSING
	},

	pasteText :
	{
		button	: 'Lim inn som ren tekst',
		title	: 'Lim inn som ren tekst'
	},

	templates :
	{
		button			: 'Maler',
		title			: 'Innholdsmaler',
		insertOption	: 'Erstatt faktisk innold',
		selectPromptMsg	: 'Velg malen du vil åpne<br>(innholdet du har skrevet blir tapt!):',
		emptyListMsg	: '(Ingen maler definert)'
	},

	showBlocks : 'Vis blokker',

	stylesCombo :
	{
		label		: 'Stil',
		panelTitle	: 'Formatting Styles', // MISSING
		panelTitle1	: 'Blokkstiler',
		panelTitle2	: 'Inlinestiler',
		panelTitle3	: 'Objektstiler'
	},

	format :
	{
		label		: 'Format',
		panelTitle	: 'Format',

		tag_p		: 'Normal',
		tag_pre		: 'Formatert',
		tag_address	: 'Adresse',
		tag_h1		: 'Tittel 1',
		tag_h2		: 'Tittel 2',
		tag_h3		: 'Tittel 3',
		tag_h4		: 'Tittel 4',
		tag_h5		: 'Tittel 5',
		tag_h6		: 'Tittel 6',
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
		label		: 'Skrift',
		voiceLabel	: 'Font',
		panelTitle	: 'Skrift'
	},

	fontSize :
	{
		label		: 'Størrelse',
		voiceLabel	: 'Font Størrelse',
		panelTitle	: 'Størrelse'
	},

	colorButton :
	{
		textColorTitle	: 'Tekstfarge',
		bgColorTitle	: 'Bakgrunnsfarge',
		panelTitle		: 'Colors', // MISSING
		auto			: 'Automatisk',
		more			: 'Flere farger...'
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
		title			: 'Stavekontroll mens du skriver',
		enable			: 'Slå på SCAYT',
		disable			: 'Slå av SCAYT',
		about			: 'Om SCAYT',
		toggle			: 'Veksle SCAYT',
		options			: 'Valg',
		langs			: 'Språk',
		moreSuggestions	: 'Flere forslag',
		ignore			: 'Ignorer',
		ignoreAll		: 'Ignorer Alle',
		addWord			: 'Legg til ord',
		emptyDic		: 'Ordboknavn skal ikke være tom',
		optionsTab		: 'Valg',
		languagesTab	: 'Språk',
		dictionariesTab	: 'Ordbøker',
		aboutTab		: 'Om'
	},

	about :
	{
		title		: 'Om CKEditor',
		dlgTitle	: 'Om CKEditor',
		moreInfo	: 'For lisensieringsinformasjon vennligst besøk vårt nettsted:',
		copy		: 'Copyright &copy; $1. Alle rettigheter reservert.'
	},

	maximize : 'Maksimer',
	minimize : 'Minimer',

	fakeobjects :
	{
		anchor	: 'Anker',
		flash	: 'Flash Animasjon',
		div		: 'Sideskift',
		unknown	: 'Ukjent objekt'
	},

	resize : 'Dra for å skalere',

	colordialog :
	{
		title		: 'Velg farge',
		highlight	: 'Merk',
		selected	: 'Valgt',
		clear		: 'Tøm'
	},

	toolbarCollapse	: 'Collapse Toolbar', // MISSING
	toolbarExpand	: 'Expand Toolbar' // MISSING
};
