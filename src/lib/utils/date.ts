import dayjs from 'dayjs';
import 'dayjs/locale/ko';
import relativeTime from 'dayjs/plugin/relativeTime';
import updateLocale from 'dayjs/plugin/updateLocale';

dayjs.locale('ko');
dayjs.extend(relativeTime);
dayjs.extend(updateLocale);

dayjs.updateLocale('ko', {
	relativeTime: {
		future: '%s후',
		past: '%s전',
		s: '몇초',
		m: '일분',
		mm: '%d분',
		h: '한시간',
		hh: '%d시간',
		d: '하루',
		dd: '%d일',
		M: '한달',
		MM: '%d달',
		y: '일년',
		yy: '%d년'
	}
});

export const dateClient = dayjs;
