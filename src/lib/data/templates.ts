import { ChoiceType, type FormQuestion } from '$lib/formLib/types';

interface templateInterface {
	name: string;
	questions: FormQuestion[];
}

export const templates: templateInterface[] = [
	{
		name: 'version_1',
		questions: [
			{ required: true, title: 'Nombre', type: 'textQuestion', propertyName: 'name' },
			{ required: true, title: 'Apellido', type: 'textQuestion', propertyName: 'lastName' },
			{
				required: true,
				title: 'Seleccione su fecha nacimiento',
				type: 'dateQuestion',
				propertyName: 'birthDate'
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
