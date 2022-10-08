export const CMP_SELECTOR = '[data-cmp-is]';

const cmpModulesCtx = require.context(
	'../components',
	true,
	/\.(ts|js|tsx)$/,
	'lazy'
);

export const componentInstances: any[] = [];

const dynamicModulesImporter = async (componentReference: HTMLElement) => {
	const classHandlerName =
		componentReference.dataset.cmpIs?.toLocaleLowerCase();
	const cmpCtx = cmpModulesCtx.keys();
	const matched = cmpCtx.filter((path) =>
		path.toLocaleLowerCase().includes(`/${classHandlerName}.ts`)
	);

	for await (const module of matched) {
		try {
			(await cmpModulesCtx(module)).default(componentReference);
		} catch (e) {
			console.error('could not load component', e);
		}
	}
};

const staticImporter = () => {
	const cmpSelector = document.querySelectorAll(CMP_SELECTOR);

	cmpSelector.forEach((cmpRef: HTMLElement) => {
		dynamicModulesImporter(cmpRef);
	});
};

document.addEventListener('DOMContentLoaded', staticImporter);
