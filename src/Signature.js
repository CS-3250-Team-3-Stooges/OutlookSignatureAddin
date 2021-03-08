class Signature {
    constructor(inc_signature) {
        this.signature = inc_signature;
        this.author = "";
    }

    constructor(inc_signature, inc_author) {
        this.signature = inc_signature;
        this.author = inc_author;
    }

    editSignature(new_signature) {
        this.signature = new_signature;
    }

    editAuthor(new_author) {
        this.author = new_author;
    }
}