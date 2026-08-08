class PCMRecorderProcessor extends AudioWorkletProcessor {
  constructor() {
    super();

    this.bufferSize = 2048;

    this.buffer =
      new Float32Array(
        this.bufferSize,
      );

    this.offset = 0;
  }


  flush() {

    const pcm =
      new Int16Array(
        this.offset,
      );


    for (
      let i = 0;
      i < this.offset;
      i++
    ) {

      const sample =
        Math.max(
          -1,
          Math.min(
            1,
            this.buffer[i],
          ),
        );


      pcm[i] =
        sample < 0
          ? sample * 0x8000
          : sample * 0x7fff;

    }


    this.port.postMessage(
      pcm.buffer,
      [
        pcm.buffer,
      ],
    );


    this.offset = 0;

  }



  process(inputs) {

    const input =
      inputs[0];


    if (
      input &&
      input[0]
    ) {

      const channel =
        input[0];


      for (
        let i = 0;
        i < channel.length;
        i++
      ) {

        this.buffer[
          this.offset++
        ] =
          channel[i];


        if (
          this.offset >=
          this.bufferSize
        ) {

          this.flush();

        }

      }

    }


    return true;

  }

}


registerProcessor(
  "pcm-recorder-processor",
  PCMRecorderProcessor,
);