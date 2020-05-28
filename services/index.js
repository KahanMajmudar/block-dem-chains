export class Client {

    static handleResponse = ({
        res, statusCode = 200, data = {}
    }) => {
        res.status(statusCode).send({
            data
        });
    };

    static handleError = ({
        res, statusCode = 500, err = 'error',
    }) => {
        res.status(statusCode).send({
          msg: err instanceof Error ? err.message : (err.msg || err),
        });
    };

}