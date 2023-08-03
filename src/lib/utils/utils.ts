export function classesActive(pathname: string, href: string, activeClass: string) {
	if (href === '/' && pathname !== '/') {
		return ``;
	}

	return pathname.startsWith(href) ? `${activeClass}` : ``;
}
