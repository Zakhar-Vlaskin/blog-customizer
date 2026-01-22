import clsx from 'clsx';
import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { Text } from 'src/ui/text';
import { RadioGroup } from 'src/ui/radio-group';
import { Select } from 'src/ui/select';
import { Separator } from 'src/ui/separator';
import { useState, useEffect } from 'react';
import {
	fontFamilyOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
	fontSizeOptions,
	ArticleStateType,
	defaultArticleState,
} from 'src/constants/articleProps';

import styles from './ArticleParamsForm.module.scss';

type ArticleParamsFormProps = {
	isOpen: boolean;
	onToggle: () => void;
	onClose: () => void;
	activeArticleState: ArticleStateType;
	onApply: (state: ArticleStateType) => void;
	onReset: () => void;
};

export const ArticleParamsForm = ({
	isOpen,
	onToggle,
	onClose,
	activeArticleState,
	onApply,
	onReset,
}: ArticleParamsFormProps) => {
	const [formState, setFormState] =
		useState<ArticleStateType>(activeArticleState);

	useEffect(() => {
		if (isOpen) {
			setFormState(activeArticleState);
		}
	}, [isOpen, activeArticleState]);

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		onApply(formState);
	};

	const handleReset = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setFormState(defaultArticleState);
		onReset();
	};

	return (
		<>
			<ArrowButton isOpen={isOpen} onClick={onToggle} />

			{isOpen && <div onClick={onClose} className={styles.overlay} />}

			<aside
				className={clsx(styles.container, isOpen && styles.container_open)}
				onClick={(e) => e.stopPropagation()}>
				<form
					onReset={handleReset}
					onSubmit={handleSubmit}
					className={styles.form}>
					<Text as='h1' size={31} weight={800} uppercase>
						Задайте параметры
					</Text>

					<Select
						title='Шрифт'
						options={fontFamilyOptions}
						selected={formState.fontFamilyOption}
						onChange={(option) =>
							setFormState((prev) => ({
								...prev,
								fontFamilyOption: option,
							}))
						}
					/>

					<RadioGroup
						name='font-size'
						title='Размер шрифта'
						options={fontSizeOptions}
						selected={formState.fontSizeOption}
						onChange={(option) =>
							setFormState((prev) => ({
								...prev,
								fontSizeOption: option,
							}))
						}
					/>

					<Select
						title='Цвет шрифта'
						options={fontColors}
						selected={formState.fontColor}
						onChange={(option) =>
							setFormState((prev) => ({
								...prev,
								fontColor: option,
							}))
						}
					/>

					<Separator />

					<Select
						title='Цвет фона'
						options={backgroundColors}
						selected={formState.backgroundColor}
						onChange={(option) =>
							setFormState((prev) => ({
								...prev,
								backgroundColor: option,
							}))
						}
					/>

					<Select
						title='Ширина контента'
						options={contentWidthArr}
						selected={formState.contentWidth}
						onChange={(option) =>
							setFormState((prev) => ({
								...prev,
								contentWidth: option,
							}))
						}
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
