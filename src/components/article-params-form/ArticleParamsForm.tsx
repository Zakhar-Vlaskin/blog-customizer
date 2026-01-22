import clsx from 'clsx';
import { useEffect, useRef, useState } from 'react';

import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { Text } from 'src/ui/text';
import { RadioGroup } from 'src/ui/radio-group';
import { Select } from 'src/ui/select';
import { Separator } from 'src/ui/separator';

import {
	fontFamilyOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
	fontSizeOptions,
	ArticleStateType,
	defaultArticleState,
	OptionType,
} from 'src/constants/articleProps';

import styles from './ArticleParamsForm.module.scss';

type ArticleParamsFormProps = {
	activeArticleState: ArticleStateType;
	onApply: (state: ArticleStateType) => void;
	onReset: () => void;
};

export const ArticleParamsForm = ({
	activeArticleState,
	onApply,
	onReset,
}: ArticleParamsFormProps) => {
	// Состояние открытия/закрытия панели (должно жить внутри компонента)
	const [isParamsOpen, setIsParamsOpen] = useState(false);

	// refs для определения клика вне панели
	const asideRef = useRef<HTMLElement | null>(null);
	const toggleRef = useRef<HTMLDivElement | null>(null);

	// Черновик состояния формы (изменяется сразу, но не применяет стили до "Применить")
	const [formState, setFormState] =
		useState<ArticleStateType>(activeArticleState);

	// Открыть/закрыть по стрелке
	const handleToggle = () => setIsParamsOpen((prev) => !prev);

	// При открытии панели подхватываем текущие применённые значения
	useEffect(() => {
		if (isParamsOpen) {
			setFormState(activeArticleState);
		}
	}, [isParamsOpen, activeArticleState]);

	// Закрытие по клику вне панели, без overlay (не блокирует взаимодействие со страницей)
	useEffect(() => {
		if (!isParamsOpen) return;

		const onPointerDownCapture = (e: PointerEvent) => {
			const target = e.target as Node | null;
			if (!target) return;

			const clickedInsideAside = asideRef.current?.contains(target) ?? false;
			const clickedOnToggle = toggleRef.current?.contains(target) ?? false;

			if (!clickedInsideAside && !clickedOnToggle) {
				setIsParamsOpen(false);
			}
		};

		document.addEventListener('pointerdown', onPointerDownCapture, true);
		return () => {
			document.removeEventListener('pointerdown', onPointerDownCapture, true);
		};
	}, [isParamsOpen]);

	// Применить настройки
	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		onApply(formState);
	};

	// Сбросить настройки к дефолту и применить
	const handleReset = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setFormState(defaultArticleState);
		onReset();
	};

	// Выношу функции из шаблона React-компонента
	const handleFontFamilyChange = (option: OptionType) => {
		setFormState((prev) => ({
			...prev,
			fontFamilyOption: option,
		}));
	};

	const handleFontSizeChange = (option: OptionType) => {
		setFormState((prev) => ({
			...prev,
			fontSizeOption: option,
		}));
	};

	const handleFontColorChange = (option: OptionType) => {
		setFormState((prev) => ({
			...prev,
			fontColor: option,
		}));
	};

	const handleBackgroundColorChange = (option: OptionType) => {
		setFormState((prev) => ({
			...prev,
			backgroundColor: option,
		}));
	};

	const handleContentWidthChange = (option: OptionType) => {
		setFormState((prev) => ({
			...prev,
			contentWidth: option,
		}));
	};

	return (
		<>
			<div ref={toggleRef}>
				<ArrowButton isOpen={isParamsOpen} onClick={handleToggle} />
			</div>

			<aside
				ref={asideRef}
				className={clsx(
					styles.container,
					isParamsOpen && styles.container_open
				)}>
				<form
					className={styles.form}
					onSubmit={handleSubmit}
					onReset={handleReset}>
					<Text as='h1' size={31} weight={800} uppercase>
						Задайте параметры
					</Text>

					<Select
						title='Шрифт'
						options={fontFamilyOptions}
						selected={formState.fontFamilyOption}
						onChange={handleFontFamilyChange}
					/>

					<RadioGroup
						name='font-size'
						title='Размер шрифта'
						options={fontSizeOptions}
						selected={formState.fontSizeOption}
						onChange={handleFontSizeChange}
					/>

					<Select
						title='Цвет шрифта'
						options={fontColors}
						selected={formState.fontColor}
						onChange={handleFontColorChange}
					/>

					<Separator />

					<Select
						title='Цвет фона'
						options={backgroundColors}
						selected={formState.backgroundColor}
						onChange={handleBackgroundColorChange}
					/>

					<Select
						title='Ширина контента'
						options={contentWidthArr}
						selected={formState.contentWidth}
						onChange={handleContentWidthChange}
					/>

					<div className={styles.bottomContainer}>
						<Button title='Сбросить' htmlType='reset' type='clear' />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
