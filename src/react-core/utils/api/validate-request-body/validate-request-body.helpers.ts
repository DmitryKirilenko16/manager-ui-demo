class FieldTypeModifier {
    protected body: any
    protected propName: string

    constructor(body: any, propName: string) {
        this.body = body
        this.propName = propName
    }

    public modify() {}
}

export class FieldNumberModifier extends FieldTypeModifier{
    public modify() {
        if(this.body[this.propName]) {
            this.body[this.propName] = Number(this.body[this.propName])
        }
    }
}

export class FieldBooleanModifier extends FieldTypeModifier{
    public modify() {
        if(this.body[this.propName]) {
            this.body[this.propName] = Boolean(this.body[this.propName])
        }
    }
}

export class FieldStringModifier extends FieldTypeModifier{
    public modify() {
        if(this.body[this.propName]) {
            this.body[this.propName] = String(this.body[this.propName])
        }
    }
}
