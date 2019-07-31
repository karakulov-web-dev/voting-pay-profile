import { FastExpress, express } from "@karakulov-web-dev/fast-express";
import getUserIdByToken from "@karakulov-web-dev/voting-pay-get-user-id-by-access-token";
import md5 from "md5";

interface IReq extends express.Request {
  body: {
    AccessToken: string;
  };
}

interface IUpdateReq extends IReq {
  body: {
    AccessToken: string;
    data: {
      profile: string;
      name: string;
      description: string;
      img: string;
    };
  };
}

function SaveImg(base64Data: string) {
  require("fs").writeFile(
    __dirname + "/../static/images/out.png",
    base64Data,
    "base64",
    function() {}
  );
}

export default class ProfilesApi<T> extends FastExpress {
  private profiles: any;
  constructor(port: number, profiles: T) {
    super(port, async app => {
      app.get("/static*", express.static(__dirname + `/../`));
      return;
    });
    this.profiles = profiles;
  }
  async get({ body }: IReq) {
    if (!body || !body.AccessToken) {
      return {
        error: true,
        errorText: "invalid data request",
        profiles: []
      };
    }

    let userId = await getUserIdByToken(body.AccessToken);
    if (!userId) {
      return {
        error: true,
        errorText: "Ошибка при проверке AccessToken",
        profiles: []
      };
    }

    return {
      error: false,
      errorText: "",
      profiles: await this.profiles.get({ userId })
    };
  }
  async create({ body }: IReq) {
    if (!body || !body.AccessToken) {
      return {
        error: true,
        errorText: "AccessToken empty or undefined"
      };
    }
    let userId = await getUserIdByToken(body.AccessToken);
    if (!userId) {
      return {
        error: true,
        errorText: "Ошибка при проверке AccessToken",
        profiles: []
      };
    }

    let profiles = await this.profiles.get({ userId });
    if (!profiles || !Array.isArray(profiles) || profiles.length) {
      return {
        error: true,
        errorText: "Невозможно создать профиль"
      };
    }

    return {
      error: false,
      errorText: "",
      result: await this.profiles.set([{ userId }])
    };
  }
  async update({ body }: IUpdateReq) {
    if (!body || !body.AccessToken || !body.data) {
      return {
        error: true,
        errorText: "invalid data request"
      };
    }

    let userId = await getUserIdByToken(body.AccessToken);
    if (!userId) {
      return {
        error: true,
        errorText: "Ошибка при проверке AccessToken",
        profiles: []
      };
    }

    let updateResult = await this.profiles.update(
      { userId },
      {
        $set: {
          profile: body.data.profile || "",
          name: body.data.name || "",
          description: body.data.description || ""
        }
      }
    );

    if (body.data.img) {
      SaveImg(body.data.img.replace(/^data:image\/png;base64,/, ""));
    }

    return {
      error: false,
      errorText: "",
      result: updateResult.result
    };
  }
}
