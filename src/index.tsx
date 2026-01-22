import { createRoot } from 'react-dom/client';
import { StrictMode, CSSProperties, useState } from 'react';
import clsx from 'clsx';

import { Article } from './components/article/Article';
import { ArticleParamsForm } from './components/article-params-form/ArticleParamsForm';
import {
	defaultArticleState,
	ArticleStateType,
} from './constants/articleProps';

import './styles/index.scss';
import styles from './styles/index.module.scss';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

const App = () => {
	//Управляет состоянием панели параметров статьи
	const [isParamsOpen, setIsParamsOpen] = useState(false);

	// Переключает состояние панели (открыть/закрыть)
	const handleToggle = () => setIsParamsOpen((prev) => !prev);
	// Закрывает панель при клики во вне
	const handleClose = () => setIsParamsOpen(false);

	// Действующие состояния для параметров статьи
	const [articleState, setArticleState] =
		useState<ArticleStateType>(defaultArticleState);

	// Новые параметры
	const handleApply = (newState: ArticleStateType) => {
		setArticleState(newState);
	};

	// Сброс параметров
	const handleReset = () => {
		setArticleState(defaultArticleState);
	};

	return (
		<main
			className={clsx(styles.main)}
			style={
				{
					'--font-family': articleState.fontFamilyOption.value,
					'--font-size': articleState.fontSizeOption.value,
					'--font-color': articleState.fontColor.value,
					'--container-width': articleState.contentWidth.value,
					'--bg-color': articleState.backgroundColor.value,
				} as CSSProperties
			}>
			<ArticleParamsForm
				isOpen={isParamsOpen}
				onToggle={handleToggle}
				onClose={handleClose}
				activeArticleState={articleState}
				onApply={handleApply}
				onReset={handleReset}
			/>
			<Article />
		</main>
	);
};

root.render(
	<StrictMode>
		<App />
	</StrictMode>
);
