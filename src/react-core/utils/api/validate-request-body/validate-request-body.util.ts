import {FieldBooleanModifier, FieldNumberModifier, FieldStringModifier} from './validate-request-body.helpers'

export enum ECastableTypes {
    STRING = 1,
    NUMBER = 2,
    BOOLEAN = 3
}

export interface IFieldToCast<PropName = string> {
    propName: PropName,
    cast: ECastableTypes
}

export class ValidateRequestBodyUtils {
    private static setEmptyBodyFieldsAsNull<T>(body: any): T | null {
        if(!((body instanceof Object) && !(body instanceof Array))) return null

        const bodyCopy = {...body}

        for (const key in bodyCopy) {
            if (bodyCopy.hasOwnProperty(key)) {
                if (!bodyCopy[key]) {
                    bodyCopy[key] = null
                }
            }
        }

        return bodyCopy
    }

    private static castFields<T>(body: any, fieldsToCast: IFieldToCast<keyof T>[] = []): T | null {
        if(!((body instanceof Object) && !(body instanceof Array))) return null

        const bodyCopy = {...body}

        fieldsToCast.forEach(field => {
            if (bodyCopy.hasOwnProperty(field.propName)) {
                switch (field.cast) {
                case ECastableTypes.BOOLEAN: {
                    new FieldBooleanModifier(bodyCopy, field.propName as string).modify()
                    break
                }
                case ECastableTypes.NUMBER: {
                    new FieldNumberModifier(bodyCopy, field.propName as string).modify()
                    break
                }
                case ECastableTypes.STRING: {
                    new FieldStringModifier(bodyCopy, field.propName as string).modify()
                    break
                }
                }
            }
        })

        return bodyCopy
    }

    static validateBody<T>(body: T, fieldsToCast: IFieldToCast<keyof T>[] = []): T | null {
        if(!((body instanceof Object) && !(body instanceof Array))) return null

        return ValidateRequestBodyUtils.castFields<T>(ValidateRequestBodyUtils.setEmptyBodyFieldsAsNull<T>(body), fieldsToCast)
    }
}
