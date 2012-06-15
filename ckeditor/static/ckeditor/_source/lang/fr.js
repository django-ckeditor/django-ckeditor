﻿/*
Copyright (c) 2003-2010, CKSource - Frederico Knabben. All rights reserved.
For licensing, see LICENSE.html or http://ckeditor.com/license
*/

/**
 * @fileOverview Defines the {@link CKEDITOR.lang} object, for the
 * French language.
 */

/**#@+
   @type String
   @example
*/

/**
 * Constains the dictionary of language entries.
 * @namespace
 */
CKEDITOR.lang['fr'] =
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
	source			: 'Source',
	newPage			: 'Nouvelle page',
	save			: 'Enregistrer',
	preview			: 'Aperçu',
	cut				: 'Couper',
	copy			: 'Copier',
	paste			: 'Coller',
	print			: 'Imprimer',
	underline		: 'Souligné',
	bold			: 'Gras',
	italic			: 'Italique',
	selectAll		: 'Tout sélectionner',
	removeFormat	: 'Supprimer la mise en forme',
	strike			: 'Barré',
	subscript		: 'Indice',
	superscript		: 'Exposant',
	horizontalrule	: 'Ligne horizontale',
	pagebreak		: 'Saut de page',
	unlink			: 'Supprimer le lien',
	undo			: 'Annuler',
	redo			: 'Rétablir',

	// Common messages and labels.
	common :
	{
		browseServer	: 'Explorer le serveur',
		url				: 'URL',
		protocol		: 'Protocole',
		upload			: 'Envoyer',
		uploadSubmit	: 'Envoyer sur le serveur',
		image			: 'Image',
		flash			: 'Flash',
		form			: 'Formulaire',
		checkbox		: 'Case à cocher',
		radio			: 'Bouton Radio',
		textField		: 'Champ texte',
		textarea		: 'Zone de texte',
		hiddenField		: 'Champ caché',
		button			: 'Bouton',
		select			: 'Liste déroulante',
		imageButton		: 'Bouton image',
		notSet			: '<non défini>',
		id				: 'Id',
		name			: 'Nom',
		langDir			: 'Sens d\'écriture',
		langDirLtr		: 'Gauche à droite (LTR)',
		langDirRtl		: 'Droite à gauche (RTL)',
		langCode		: 'Code de langue',
		longDescr		: 'URL de description longue (longdesc => malvoyant)',
		cssClass		: 'Classe CSS',
		advisoryTitle	: 'Description (title)',
		cssStyle		: 'Style',
		ok				: 'OK',
		cancel			: 'Annuler',
		close			: 'Close', // MISSING
		preview			: 'Preview', // MISSING
		generalTab		: 'Général',
		advancedTab		: 'Avancé',
		validateNumberFailed : 'Cette valeur n\'est pas un nombre.',
		confirmNewPage	: 'Les changements non sauvegardés seront perdus. Etes-vous sûr de vouloir charger une nouvelle page?',
		confirmCancel	: 'Certaines options ont été modifiées. Etes-vous sûr de vouloir fermer?',
		options			: 'Options', // MISSING
		target			: 'Target', // MISSING
		targetNew		: 'New Window (_blank)', // MISSING
		targetTop		: 'Topmost Window (_top)', // MISSING
		targetSelf		: 'Same Window (_self)', // MISSING
		targetParent	: 'Parent Window (_parent)', // MISSING

		// Put the voice-only part of the label in the span.
		unavailable		: '%1<span class="cke_accessibility">, Indisponible</span>'
	},

	// Special char dialog.
	specialChar		:
	{
		toolbar		: 'Insérer un caractère spécial',
		title		: 'Sélectionnez un caractère'
	},

	// Link dialog.
	link :
	{
		toolbar		: 'Lien',
		menu		: 'Editer le lien',
		title		: 'Lien',
		info		: 'Infos sur le lien',
		target		: 'Cible',
		upload		: 'Envoyer',
		advanced	: 'Avancé',
		type		: 'Type de lien',
		toUrl		: 'URL', // MISSING
		toAnchor	: 'Transformer le lien en ancre dans le texte',
		toEmail		: 'E-mail',
		targetFrame		: '<cadre>',
		targetPopup		: '<fenêtre popup>',
		targetFrameName	: 'Nom du Cadre destination',
		targetPopupName	: 'Nom de la fenêtre popup',
		popupFeatures	: 'Options de la fenêtre popup',
		popupResizable	: 'Redimensionnable',
		popupStatusBar	: 'Barre de status',
		popupLocationBar: 'Barre d\'adresse',
		popupToolbar	: 'Barre d\'outils',
		popupMenuBar	: 'Barre de menu',
		popupFullScreen	: 'Plein écran (IE)',
		popupScrollBars	: 'Barres de défilement',
		popupDependent	: 'Dépendante (Netscape)',
		popupWidth		: 'Largeur',
		popupLeft		: 'Position gauche',
		popupHeight		: 'Hauteur',
		popupTop		: 'Position haute',
		id				: 'Id',
		langDir			: 'Sens d\'écriture',
		langDirLTR		: 'Gauche à droite',
		langDirRTL		: 'Droite à gauche',
		acccessKey		: 'Touche d\'accessibilité',
		name			: 'Nom',
		langCode		: 'Code de langue',
		tabIndex		: 'Index de tabulation',
		advisoryTitle	: 'Description (title)',
		advisoryContentType	: 'Type de contenu (ex: text/html)',
		cssClasses		: 'Classe du CSS',
		charset			: 'Charset de la cible',
		styles			: 'Style',
		selectAnchor	: 'Sélectionner l\'ancre',
		anchorName		: 'Par nom d\'ancre',
		anchorId		: 'Par ID d\'élément',
		emailAddress	: 'Adresse E-Mail',
		emailSubject	: 'Sujet du message',
		emailBody		: 'Corps du message',
		noAnchors		: '(Aucune ancre disponible dans ce document)',
		noUrl			: 'Veuillez entrer l\'adresse du lien',
		noEmail			: 'Veuillez entrer l\'adresse e-mail'
	},

	// Anchor dialog
	anchor :
	{
		toolbar		: 'Ancre',
		menu		: 'Editer l\'ancre',
		title		: 'Propriétés de l\'ancre',
		name		: 'Nom de l\'ancre',
		errorName	: 'Veuillez entrer le nom de l\'ancre'
	},

	// Find And Replace Dialog
	findAndReplace :
	{
		title				: 'Trouver et remplacer',
		find				: 'Trouver',
		replace				: 'Remplacer',
		findWhat			: 'Expression à trouver: ',
		replaceWith			: 'Remplacer par: ',
		notFoundMsg			: 'Le texte spécifié ne peut être trouvé.',
		matchCase			: 'Respecter la casse',
		matchWord			: 'Mot entier uniquement',
		matchCyclic			: 'Boucler',
		replaceAll			: 'Remplacer tout',
		replaceSuccessMsg	: '%1 occurrence(s) replacée(s).'
	},

	// Table Dialog
	table :
	{
		toolbar		: 'Tableau',
		title		: 'Propriétés du tableau',
		menu		: 'Propriétés du tableau',
		deleteTable	: 'Supprimer le tableau',
		rows		: 'Lignes',
		columns		: 'Colonnes',
		border		: 'Taille de la bordure',
		align		: 'Alignement du contenu',
		alignLeft	: 'Gauche',
		alignCenter	: 'Centré',
		alignRight	: 'Droite',
		width		: 'Largeur',
		widthPx		: 'pixels',
		widthPc		: '% pourcents',
		widthUnit	: 'width unit', // MISSING
		height		: 'Hauteur',
		cellSpace	: 'Espacement des cellules',
		cellPad		: 'Marge interne des cellules',
		caption		: 'Titre du tableau',
		summary		: 'Résumé (description)',
		headers		: 'En-Têtes',
		headersNone		: 'Aucunes',
		headersColumn	: 'Première colonne',
		headersRow		: 'Première ligne',
		headersBoth		: 'Les deux',
		invalidRows		: 'Le nombre de lignes doit être supérieur à 0.',
		invalidCols		: 'Le nombre de colonnes doit être supérieur à 0.',
		invalidBorder	: 'La taille de la bordure doit être un nombre.',
		invalidWidth	: 'La largeur du tableau doit être un nombre.',
		invalidHeight	: 'La hauteur du tableau doit être un nombre.',
		invalidCellSpacing	: 'L\'espacement des cellules doit être un nombre.',
		invalidCellPadding	: 'La marge intérieure des cellules doit être un nombre.',

		cell :
		{
			menu			: 'Cellule',
			insertBefore	: 'Insérer une cellule avant',
			insertAfter		: 'Insérer une cellule après',
			deleteCell		: 'Supprimer les cellules',
			merge			: 'Fusionner les cellules',
			mergeRight		: 'Fusionner à droite',
			mergeDown		: 'Fusionner en bas',
			splitHorizontal	: 'Fractionner horizontalement',
			splitVertical	: 'Fractionner verticalement',
			title			: 'Propriétés de Cellule',
			cellType		: 'Type de Cellule',
			rowSpan			: 'Fusion de Lignes',
			colSpan			: 'Fusion de Colonnes',
			wordWrap		: 'Word Wrap', // MISSING
			hAlign			: 'Alignement Horizontal',
			vAlign			: 'Alignement Vertical',
			alignTop		: 'Haut',
			alignMiddle		: 'Milieu',
			alignBottom		: 'Bas',
			alignBaseline	: 'Bas du texte',
			bgColor			: 'Couleur d\'arrière-plan',
			borderColor		: 'Couleur de Bordure',
			data			: 'Données',
			header			: 'Entête',
			yes				: 'Oui',
			no				: 'Non',
			invalidWidth	: 'La Largeur de Cellule doit être un nombre.',
			invalidHeight	: 'La Hauteur de Cellule doit être un nombre.',
			invalidRowSpan	: 'La fusion de lignes doit être un nombre entier.',
			invalidColSpan	: 'La fusion de colonnes doit être un nombre entier.',
			chooseColor		: 'Choose' // MISSING
		},

		row :
		{
			menu			: 'Ligne',
			insertBefore	: 'Insérer une ligne avant',
			insertAfter		: 'Insérer une ligne après',
			deleteRow		: 'Supprimer les lignes'
		},

		column :
		{
			menu			: 'Colonnes',
			insertBefore	: 'Insérer une colonne avant',
			insertAfter		: 'Insérer une colonne après',
			deleteColumn	: 'Supprimer les colonnes'
		}
	},

	// Button Dialog.
	button :
	{
		title		: 'Propriétés du bouton',
		text		: 'Texte (Value)',
		type		: 'Type',
		typeBtn		: 'Bouton',
		typeSbm		: 'Validation (submit)',
		typeRst		: 'Remise à zéro'
	},

	// Checkbox and Radio Button Dialogs.
	checkboxAndRadio :
	{
		checkboxTitle : 'Propriétés de la case à cocher',
		radioTitle	: 'Propriétés du bouton Radio',
		value		: 'Valeur',
		selected	: 'Sélectionné'
	},

	// Form Dialog.
	form :
	{
		title		: 'Propriétés du formulaire',
		menu		: 'Propriétés du formulaire',
		action		: 'Action',
		method		: 'Méthode',
		encoding	: 'Encodage'
	},

	// Select Field Dialog.
	select :
	{
		title		: 'Propriétés du menu déroulant',
		selectInfo	: 'Informations sur le menu déroulant',
		opAvail		: 'Options disponibles',
		value		: 'Valeur',
		size		: 'Taille',
		lines		: 'Lignes',
		chkMulti	: 'Permettre les sélections multiples',
		opText		: 'Texte',
		opValue		: 'Valeur',
		btnAdd		: 'Ajouter',
		btnModify	: 'Modifier',
		btnUp		: 'Haut',
		btnDown		: 'Bas',
		btnSetValue : 'Définir comme valeur sélectionnée',
		btnDelete	: 'Supprimer'
	},

	// Textarea Dialog.
	textarea :
	{
		title		: 'Propriétés de la zone de texte',
		cols		: 'Colonnes',
		rows		: 'Lignes'
	},

	// Text Field Dialog.
	textfield :
	{
		title		: 'Propriétés du champ texte',
		name		: 'Nom',
		value		: 'Valeur',
		charWidth	: 'Taille des caractères',
		maxChars	: 'Nombre maximum de caractères',
		type		: 'Type',
		typeText	: 'Texte',
		typePass	: 'Mot de passe'
	},

	// Hidden Field Dialog.
	hidden :
	{
		title	: 'Propriétés du champ caché',
		name	: 'Nom',
		value	: 'Valeur'
	},

	// Image Dialog.
	image :
	{
		title		: 'Propriétés de l\'image',
		titleButton	: 'Propriétés du bouton image',
		menu		: 'Propriétés de l\'image',
		infoTab		: 'Informations sur l\'image',
		btnUpload	: 'Envoyer sur le serveur',
		upload		: 'Envoyer',
		alt			: 'Texte de remplacement',
		width		: 'Largeur',
		height		: 'Hauteur',
		lockRatio	: 'Garder les proportions',
		unlockRatio	: 'Unlock Ratio', // MISSING
		resetSize	: 'Taille d\'origine',
		border		: 'Bordure',
		hSpace		: 'Espacement horizontal',
		vSpace		: 'Espacement vertical',
		align		: 'Alignement',
		alignLeft	: 'Gauche',
		alignRight	: 'Droite',
		alertUrl	: 'Veuillez entrer l\'adresse de l\'image',
		linkTab		: 'Lien',
		button2Img	: 'Voulez-vous transformer le bouton image sélectionné en simple image?',
		img2Button	: 'Voulez-vous transformer l\'image en bouton image?',
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
		properties		: 'Propriétés du Flash',
		propertiesTab	: 'Propriétés',
		title			: 'Propriétés du Flash',
		chkPlay			: 'Jouer automatiquement',
		chkLoop			: 'Boucle',
		chkMenu			: 'Activer le menu Flash',
		chkFull			: 'Permettre le plein écran',
 		scale			: 'Echelle',
		scaleAll		: 'Afficher tout',
		scaleNoBorder	: 'Pas de bordure',
		scaleFit		: 'Taille d\'origine',
		access			: 'Accès aux scripts',
		accessAlways	: 'Toujours',
		accessSameDomain: 'Même domaine',
		accessNever		: 'Jamais',
		align			: 'Alignement',
		alignLeft		: 'Gauche',
		alignAbsBottom	: 'Bas absolu',
		alignAbsMiddle	: 'Milieu absolu',
		alignBaseline	: 'Bas du texte',
		alignBottom		: 'Bas',
		alignMiddle		: 'Milieu',
		alignRight		: 'Droite',
		alignTextTop	: 'Haut du texte',
		alignTop		: 'Haut',
		quality			: 'Qualité',
		qualityBest		: 'Meilleure',
		qualityHigh		: 'Haute',
		qualityAutoHigh	: 'Haute Auto',
		qualityMedium	: 'Moyenne',
		qualityAutoLow	: 'Basse Auto',
		qualityLow		: 'Basse',
		windowModeWindow: 'Fenêtre',
		windowModeOpaque: 'Opaque',
		windowModeTransparent : 'Transparent',
		windowMode		: 'Mode fenêtre',
		flashvars		: 'Variables du Flash',
		bgcolor			: 'Couleur d\'arrière-plan',
		width			: 'Largeur',
		height			: 'Hauteur',
		hSpace			: 'Espacement horizontal',
		vSpace			: 'Espacement vertical',
		validateSrc		: 'L\'adresse ne doit pas être vide.',
		validateWidth	: 'La largeur doit être un nombre.',
		validateHeight	: 'La hauteur doit être un nombre.',
		validateHSpace	: 'L\'espacement horizontal doit être un nombre.',
		validateVSpace	: 'L\'espacement vertical doit être un nombre.'
	},

	// Speller Pages Dialog
	spellCheck :
	{
		toolbar			: 'Vérifier l\'orthographe',
		title			: 'Vérifier l\'orthographe',
		notAvailable	: 'Désolé, le service est indisponible actuellement.',
		errorLoading	: 'Erreur du chargement du service depuis l\'hôte : %s.',
		notInDic		: 'N\'existe pas dans le dictionnaire',
		changeTo		: 'Modifier pour',
		btnIgnore		: 'Ignorer',
		btnIgnoreAll	: 'Ignorer tout',
		btnReplace		: 'Remplacer',
		btnReplaceAll	: 'Remplacer tout',
		btnUndo			: 'Annuler',
		noSuggestions	: '- Aucune suggestion -',
		progress		: 'Vérification de l\'orthographe en cours...',
		noMispell		: 'Vérification de l\'orthographe terminée : aucune erreur trouvée',
		noChanges		: 'Vérification de l\'orthographe terminée : Aucun mot corrigé',
		oneChange		: 'Vérification de l\'orthographe terminée : Un seul mot corrigé',
		manyChanges		: 'Vérification de l\'orthographe terminée : %1 mots corrigés',
		ieSpellDownload	: 'La vérification d\'orthographe n\'est pas installée. Voulez-vous la télécharger maintenant?'
	},

	smiley :
	{
		toolbar	: 'Emoticon',
		title	: 'Insérer un émoticon'
	},

	elementsPath :
	{
		eleLabel : 'Elements path', // MISSING
		eleTitle : '%1 éléments'
	},

	numberedlist	: 'Insérer/Supprimer la liste numérotée',
	bulletedlist	: 'Insérer/Supprimer la liste à puces',
	indent			: 'Augmenter le retrait (tabulation)',
	outdent			: 'Diminuer le retrait (tabulation)',

	justify :
	{
		left	: 'Aligner à gauche',
		center	: 'Centrer',
		right	: 'Aligner à droite',
		block	: 'Justifier'
	},

	blockquote : 'Citation',

	clipboard :
	{
		title		: 'Coller',
		cutError	: 'Les paramètres de sécurité de votre navigateur ne permettent pas à l\'éditeur d\'exécuter automatiquement l\'opération "couper". Veuillez utiliser le raccourci clavier (Ctrl+X).',
		copyError	: 'Les paramètres de sécurité de votre navigateur ne permettent pas à l\'éditeur d\'exécuter automatiquement des opérations de copie. Veuillez utiliser le raccourci clavier (Ctrl+C).',
		pasteMsg	: 'Veuillez coller le texte dans la zone suivante en utilisant le raccourci clavier (<strong>Ctrl+V</strong>) et cliquez sur OK',
		securityMsg	: 'A cause des paramètres de sécurité de votre navigateur, l\'éditeur n\'est pas en mesure d\'accéder directement à vos données contenues dans le presse-papier. Vous devriez réessayer de coller les données dans la fenêtre.',
		pasteArea	: 'Paste Area' // MISSING
	},

	pastefromword :
	{
		confirmCleanup	: 'Le texte à coller semble provenir de Word. Désirez-vous le nettoyer avant de coller?',
		toolbar			: 'Coller depuis Word',
		title			: 'Coller depuis Word',
		error			: 'It was not possible to clean up the pasted data due to an internal error' // MISSING
	},

	pasteText :
	{
		button	: 'Coller comme texte sans mise en forme',
		title	: 'Coller comme texte sans mise en forme'
	},

	templates :
	{
		button			: 'Modèles',
		title			: 'Contenu des modèles',
		insertOption	: 'Remplacer le contenu actuel',
		selectPromptMsg	: 'Veuillez sélectionner le modèle pour l\'ouvrir dans l\'éditeur',
		emptyListMsg	: '(Aucun modèle disponible)'
	},

	showBlocks : 'Afficher les blocs',

	stylesCombo :
	{
		label		: 'Styles',
		panelTitle	: 'Formatting Styles', // MISSING
		panelTitle1	: 'Styles de blocs',
		panelTitle2	: 'Styles en ligne',
		panelTitle3	: 'Styles d\'objet'
	},

	format :
	{
		label		: 'Format',
		panelTitle	: 'Format de paragraphe',

		tag_p		: 'Normal',
		tag_pre		: 'Formaté',
		tag_address	: 'Adresse',
		tag_h1		: 'Titre 1',
		tag_h2		: 'Titre 2',
		tag_h3		: 'Titre 3',
		tag_h4		: 'Titre 4',
		tag_h5		: 'Titre 5',
		tag_h6		: 'Titre 6',
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
		label		: 'Police',
		voiceLabel	: 'Police',
		panelTitle	: 'Style de police'
	},

	fontSize :
	{
		label		: 'Taille',
		voiceLabel	: 'Taille de police',
		panelTitle	: 'Taille de police'
	},

	colorButton :
	{
		textColorTitle	: 'Couleur de texte',
		bgColorTitle	: 'Couleur d\'arrière plan',
		panelTitle		: 'Colors', // MISSING
		auto			: 'Automatique',
		more			: 'Plus de couleurs...'
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
		title			: 'Vérification d\'Orthographe en Cours de Frappe (SCAYT: Spell Check As You Type)',
		enable			: 'Activer SCAYT',
		disable			: 'Désactiver SCAYT',
		about			: 'A propos de SCAYT',
		toggle			: 'Activer/Désactiver SCAYT',
		options			: 'Options',
		langs			: 'Langues',
		moreSuggestions	: 'Plus de suggestions',
		ignore			: 'Ignorer',
		ignoreAll		: 'Ignorer Tout',
		addWord			: 'Ajouter le mot',
		emptyDic		: 'Le nom du dictionnaire ne devrait pas être vide.',
		optionsTab		: 'Options',
		languagesTab	: 'Langues',
		dictionariesTab	: 'Dictionnaires',
		aboutTab		: 'A propos de'
	},

	about :
	{
		title		: 'A propos de CKEditor',
		dlgTitle	: 'A propos de CKEditor',
		moreInfo	: 'Pour les informations de licence, veuillez visiter notre site web:',
		copy		: 'Copyright &copy; $1. Tous droits réservés.'
	},

	maximize : 'Agrandir',
	minimize : 'Minimize', // MISSING

	fakeobjects :
	{
		anchor	: 'Ancre',
		flash	: 'Animation Flash',
		div		: 'Saut de Page',
		unknown	: 'Objet Inconnu'
	},

	resize : 'Glisser pour modifier la taille',

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
