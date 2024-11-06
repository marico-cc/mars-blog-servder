import { Inject, Injectable } from '@nestjs/common';
import { CreateFileInput } from './dto/create-file.input';
import { UpdateFileInput } from './dto/update-file.input';
import { File } from './entities/file.entity';
import * as OSS from 'ali-oss';
import { ConfigService } from '../shared/config/config.service';

@Injectable()
export class FileService {
  constructor(
    @Inject('FileRepository') private readonly repository: typeof File,
    private readonly configService: ConfigService,
  ) {}
  create(createFileInput: CreateFileInput) {
    return this.repository.create({ ...createFileInput });
  }

  findAll() {
    return this.repository.findAll();
  }

  findOne(id: string) {
    return this.repository.findByPk(id);
  }

  findByFileName(fileName: string) {
    return this.repository.findOne({ where: { fileName } });
  }

  async updateQueryCount(fileName: string) {
    const file = await this.findByFileName(fileName);
    if (!file) return;
    file.queryCount++;
    await file.save();
  }

  async update(updateFileInput: UpdateFileInput) {
    const record = await this.repository.findByPk(updateFileInput.id);
    record.set(updateFileInput);
    return await record.save();
  }

  async remove(fileName: string) {
    const record = await this.repository.findOne({ where: { fileName } });
    await record.destroy();
    return record;
  }

  async ossUploadSignup() {
    const client = new OSS(this.configService.ossConfig);

    const date = new Date();
    date.setDate(date.getDate() + 1);
    const policy = {
      expiration: date.toISOString(), // 请求有效期
      conditions: [
        ['content-length-range', 0, 1048576000], // 设置上传文件的大小限制
        { bucket: client.options.bucket }, // 限制可上传的bucket
      ],
    };

    // //  跨域才设置
    // res.set({
    //   'Access-Control-Allow-Origin': req.headers.origin || '*',
    //   'Access-Control-Allow-Methods': 'PUT,POST,GET',
    // });

    //签名
    const formData = await client.calculatePostSignature(policy);
    //bucket域名
    const host = `https://${this.configService.ossConfig.bucket}.${
      (await client.getBucketLocation()).location
    }.aliyuncs.com`.toString();
    //回调
    const callback = {
      callbackUrl: this.configService.ossConfig.callbackUrl,
      callbackBody:
        'bucket=${bucket}&filename=${object}&etag=${etag}&size=${size}&mimeType=${mimeType}&imageInfo.height=${imageInfo.height}&imageInfo.width=${imageInfo.width}&imageInfo.format=${imageInfo.format}&sid=${sid}&uuid=${uuid}',
      callbackBodyType: 'application/x-www-form-urlencoded',
    };

    //返回参数
    return {
      expire: new Date(Date.now() + 1000 * 60 * 60 * 24).toUTCString(),
      policy: formData.policy,
      signature: formData.Signature,
      accessId: formData.OSSAccessKeyId,
      host,
      callback: Buffer.from(JSON.stringify(callback)).toString('base64'),
      dir: this.configService.ossConfig.dir,
    };
  }
}
