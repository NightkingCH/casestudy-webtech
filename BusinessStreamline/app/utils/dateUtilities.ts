import { MomentLocale } from '../constants/constants';

export class DateUtilities {

    private static DELIMITER_REGEX: string = "[.-\/-\s]{1}";

    // use browser specific region, the current moment language settings and the iso format to recognize if the date is valid.
    public static RECOGNIZE_FORMAT: Array<string | moment.MomentLanguageData | Function> = [moment.localeData(MomentLocale.GERMAN).longDateFormat("L"), "L", "L LT", "L LTS", moment.ISO_8601];

    /**
     * Tests an input if it's a date. Provides type guarding for intellisense.
     * @return boolean & type guard
     */
    public static isDate(date: any): date is Date {
        //only add a "valid from"-date if the entity is a new object.

        if (!date) {
            return false;
        }

        if (!date.getTime) {
            return false;
        }

        if (!date.getYear) {
            return false;
        }

        return DateUtilities.isValidDate(date);
    }

    /**
     * Tests an input if it's a valid date.
     * @remark combines date object validation and moment.isValid.
     * @remark type should be date but "getYear" isn't defined in the lib.d.ts.
     * @remarok "01.01" isn't a valid date!
     * @return boolean
     */
    public static isValidDate(date: any): boolean {
        if (!date) {
            return false;
        }

        if (date.getTime) {
            if (isNaN(date.getTime())) {
                return false;
            }
        }

        if (date.getYear) {
            if (date.getYear() == 0) {
                return false;
            }
        }

        if (typeof date != "string") {
            return moment(date).isValid();
        }

        var delimiters: RegExpMatchArray = date.match(new RegExp(DateUtilities.DELIMITER_REGEX, "gi"));

        // no delimiter was found, therefore no valid date.
        if (!delimiters) {
            return false;
        }

        // a valid date always consists of three parts (d/m/y). Regardless of the region specific date format.
        // "01.01" => isn't a valid date. And date tools automatically assume that this is for example the 1. Januar 2001.
        if (delimiters.length <= 1) {
            return false;
        }

        var splittedDate = date.split(DateUtilities.getDateDelimiter(date));

        if (splittedDate.length <= 1) {
            return false;
        }

        if (splittedDate.length == 2) {
            return true;
        }

        // last date part must contain a value. 31.12. is invalid because the third part is empty.
        if (splittedDate[2] == null || splittedDate[2] == "") {
            return false;
        }

        return moment(date, DateUtilities.RECOGNIZE_FORMAT).isValid();
    }

    /**
     * Returns the delimiter between the date parts.
     * @remark there are only four specific delimiters for a date: point, dash, slash or single whitespaces.
     */
    public static getDateDelimiter(date: string): string {
        // without the flag "g"! we only need the index of the first match.
        var match: RegExpMatchArray = date.match(new RegExp(DateUtilities.DELIMITER_REGEX, "i"));

        if (!match) {
            return "";
        }

        return date.substring(match.index, match.index + 1);
    }

    public static getIsoString(date: string): string {
        return moment(date, DateUtilities.RECOGNIZE_FORMAT).toISOString();
    }

    public static toString(date: string): string {
        return moment(date, DateUtilities.RECOGNIZE_FORMAT).format();
    }
}
