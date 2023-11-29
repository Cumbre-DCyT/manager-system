import { ChoiceType, type FormQuestion } from '$lib';

interface templateInterface {
	type: string;
	questions: FormQuestion[];
}

export const templates: templateInterface[] = [
	{
		type: 'normal',
		questions: [
			{ required: true, title: 'Nombre', type: 'textQuestion', propertyName: 'name' },
			{ required: true, title: 'Apellido', type: 'textQuestion', propertyName: 'lastname' },
			{
				required: true,
				title: 'Selecciones su fecha nacimiento',
				type: 'dateQuestion',
				propertyName: ''
			},
			{ required: true, title: 'Cédula', type: 'textQuestion', propertyName: 'dni' },
			{ required: true, title: 'Teléfono', type: 'textQuestion', propertyName: 'phone' },
			{
				required: true,
				title: '¿ Pertenece a la ucla ?',
				type: 'choiceQuestion',
				choice: {
					type: ChoiceType.RADIO,
					options: [
						{ value: 'si', isOther: false },
						{ value: 'no', isOther: false }
					]
				},
				propertyName: 'isUcla'
			},
			{
				required: true,
				title: '¿ A que te dedicas ?',
				type: 'textQuestion',
				propertyName: 'occupation'
			},
			{
				required: true,
				title: '¿ Método de pago ?',
				type: 'choiceQuestion',
				choice: {
					type: ChoiceType.RADIO,
					options: [
						{ value: 'Pago móvil', isOther: false },
						{ value: 'Divisas', isOther: false },
						{ value: 'Bolivares efectivo', isOther: false }
					]
				},
				propertyName: 'payment_method'
			}
		]
	}
];
